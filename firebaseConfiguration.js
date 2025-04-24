// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTBOA6lThZCyUuCqlYdC2kL8GPndMf8bU",
  authDomain: "chat-app-ccf38.firebaseapp.com",
  projectId: "chat-app-ccf38",
  storageBucket: "chat-app-ccf38.firebasestorage.app",
  messagingSenderId: "713236873551",
  appId: "1:713236873551:web:663d508a522cbcaa1b053a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage) 
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'messages');