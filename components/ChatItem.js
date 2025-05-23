import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash, getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfiguration';

export default function ChatItem({item, router, noBorder, currentUser}) {
    const [lastMessage, setLastMessage] = useState(undefined);
    
    useEffect(() => {
        let roomId = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messageRef = collection(docRef, 'messages');
        const q = query(messageRef, orderBy('createdAt', 'desc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data();
            });
            setLastMessage(allMessages[0]? allMessages[0]: null);
        });
        return unsub;
    }, []);

    const openChatRoom = () => {
        router.push({
            pathname: '/chatRoom',
            params: item
        });
    }

    const renderTime = () => {
        if(lastMessage) {
            let date = new Date(lastMessage?.createdAt?.seconds * 1000);
            let hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
            let minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
            return `${hours}:${minutes}`;
        }
        if(typeof lastMessage == 'undefined') return 'Loading...';
    }

    const renderLastMessage = () => {  
        if(typeof lastMessage == 'undefined') return 'Loading...';
        if(lastMessage) {
            if(currentUser?.userId == lastMessage?.userId) {
                return `You: ${lastMessage?.text}`;
            }
            return lastMessage?.text;
        } else {
            return 'Send a message 👍';
        }
    }

  return (
    <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? '' : 'border-b border-b-neutral-200'}`}>
        <Image
            style={{height: hp(6), width: hp(6), borderRadius: 100}}
            source={item?.profileUrl}
            placeholder={blurhash}
            transition={500}
        />
        <View className="flex-1 gap-1">
            <View className="flex-row justify-between">
                <Text 
                    style={{fontSize: hp(1.8)}}
                    className="font-semibold text-neutral-800"
                >
                    {item?.username}
                </Text>
                <Text 
                    style={{fontSize: hp(1.6)}}
                    className="font-medium text-neutral-500"
                >
                   {renderTime()} 
                </Text>
            </View>
            <Text
                style={{fontSize: hp(1.6)}}
                className="font-medium text-neutral-500"
            >{renderLastMessage()}</Text>
        </View>
    </TouchableOpacity>
  )
}