import { View, Text, StatusBar, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ChatRoomHeader from '../../components/ChatRoomHeader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MessageList from '../../components/MessageList';
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import { useAuth } from '../../context/authContext';
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfiguration';
import { getRoomId } from '../../utils/common';
import { sendPushNotification } from '../../utils/notifications';

export default function ChatRoom() {
    const item = useLocalSearchParams();
    const {user} = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const texRef = useRef('');
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        createRoomIfNotExists();

        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messageRef = collection(docRef, 'messages');
        const q = query(messageRef, orderBy('createdAt', 'asc'));

        let unsub = onSnapshot (q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data();
            });
            setMessages([...allMessages]);
        });

        const KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', updateScrollView);

        return ()=> {
            unsub();
            KeyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        updateScrollView();
    }, [messages]);

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({animated: true});
        }, 100);
    }

    const createRoomIfNotExists = async () => {
        let roomId = getRoomId(user?.userId, item?.userId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date()),
        });
    }

    const handleSendMessage = async () => {
        let message = texRef.current.trim();
        if(!message) {
            return;
        }
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomId);
            const messageRef = collection(docRef, 'messages');
            texRef.current = '';
            if(inputRef) inputRef?.current?.clear();

            // Send the message
            const newDoc = await addDoc(messageRef, {
                userId: user?.userId,
                text: message,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date()),
            });

            // Get recipient's push token and send notification
            const recipientDoc = await getDoc(doc(db, 'users', item?.userId));
            const recipientData = recipientDoc.data();
            
            if (recipientData?.pushToken) {
                await sendPushNotification(
                    recipientData.pushToken,
                    user?.username,
                    message
                );
            }

        }catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
    }

  return (
    <CustomKeyboardView inChat={true}>
        <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router}/>
        <View className="h-3 border-b border-neutral-300" />
            <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
                <View className='flex-1'>
                    <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>
                </View>
                <View style={{marginBottom: hp(1.7)}} className="pt-2">
                    <View className="flex-row justify-between items-center mx-3">
                        <View className="flex-row items-center bg-white border border-neutral-300 rounded-full px-4 py-2 shadow-sm flex-1">
                            <TextInput
                                ref={inputRef}
                                onChangeText={value => texRef.current = value}
                                placeholder='Type a message...'
                                className="flex-1 text-base text-neutral-900"
                                style={{fontSize: hp(2.2), minHeight: 40}}
                                placeholderTextColor="#888"
                            />
                            <TouchableOpacity onPress={handleSendMessage} className="ml-2">
                                <Feather name="send" size={hp(3)} color="grey" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
      </CustomKeyboardView>
  )
}