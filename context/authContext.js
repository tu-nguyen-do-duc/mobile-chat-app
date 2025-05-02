import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebaseConfiguration";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfiguration";
import { registerForPushNotificationsAsync } from "../utils/notifications";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        })
        return unsub;
    },[])

    const updateUserData = async (userId) => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId, pushToken: data.pushToken});
            
            // Update push token if needed
            const token = await registerForPushNotificationsAsync();
            if (token && token !== data.pushToken) {
                await updateDoc(docRef, { pushToken: token });
            }
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success: true};
        }catch(e) {
            let msg = e.message;
            if(msg.includes('auth/invalid-credential')) msg='Wrong credentials!';
            if(msg.includes('auth/invalid-email')) msg='Invalid email format!';
            if(msg.includes('auth/user-disabled')) msg='This account has been disabled';
            if(msg.includes('auth/user-not-found')) msg='No account found with this email';
            if(msg.includes('auth/network-request-failed')) msg='Network error - check your connection';
            return {success: false, msg};
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            return {success: true};
        }catch(e) {
            return {success: false, msg: e.message, error: e};
        }
    }

    const register = async (email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const token = await registerForPushNotificationsAsync();
            
            await setDoc(doc(db, "users", response?.user?.uid), {
                userId: response?.user?.uid,
                username,
                profileUrl,
                pushToken: token
            });
            return {success: true, data: response?.user};
        }catch(e) {
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)')) msg='Invalid email address!';
            else if(msg.includes('(auth/email-already-in-use)')) msg='Email already in use!';
            else if(msg.includes('(auth/weak-password)')) msg='Password should be at least 6 characters!';
            else if(msg.includes('(auth/operation-not-allowed)')) msg='Operation not allowed!';
            else if(msg.includes('(auth/too-many-requests)')) msg='Too many requests!';
            else if(msg.includes('(auth/user-disabled)')) msg='User disabled!';
            else if(msg.includes('(auth/user-not-found)')) msg='User not found!';
            return {success: false, msg};
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (value === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return value;
}