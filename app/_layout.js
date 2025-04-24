import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import {Slot, useRouter, useSegments} from 'expo-router';
import "../global.css"
import { AuthContextProvider, useAuth } from '../context/authContext';
import { MenuProvider } from 'react-native-popup-menu';

const MainLayout = () => {
    const {isAuthenticated} = useAuth(); // Custom hook to check authentication status
    const segments = useSegments(); // Custom hook to get the current segment
    const router = useRouter(); 

    useEffect(() => {
        // Check if the user is authenticated
        if(typeof isAuthenticated == 'undefined') return;
        const inApp = segments[0] == '(app)'; // Check if the current segment is not in the app
        if(isAuthenticated && !inApp) {
            // redirect to home page
            router.replace('home');
        } else if(isAuthenticated == false) {
            // redirect to log in page
            router.replace('logIn');
        }
    }, [isAuthenticated])

    return <Slot />;
}

export default function RootLayout() {
    return (
        <MenuProvider>
            <AuthContextProvider>
                <MainLayout />
            </AuthContextProvider>
        </MenuProvider>
    )
}