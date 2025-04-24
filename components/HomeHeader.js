import { View, Text, Platform } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useAuth } from '../context/authContext';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { blurhash } from '../utils/common';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItems';
import { Feather } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ios = Platform.OS === 'ios';

export default function HomeHeader() {
    const { user, logout } = useAuth(); 

    const { top } = useSafeAreaInsets();

    const handleProfile = () => {}

    const handleLogout = async () => {
        await logout();
    }

  return (
    <View
        style={{ paddingTop: ios ? top : top + 10 }}
        className="flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow"
    >
    <View>
        <Text style={{fontSize: hp(3)}} className="font-medium text-white">Chat</Text>
    </View>

    <View>
        <Menu>
            <MenuTrigger customStyles={{
                triggerWrapper: {
                    
                },
            }}>
                <Image
                    style={{height: hp(4.3), aspectRatio: 1, borderRadius: 100}}
                    source={user?.profileUrl}
                    placeholder={ blurhash }
                    transition={500}
                />
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionsContainer: {
                        borderRadius: 10,
                        borderCurve: 'continuous',
                        marginTop: 40,
                        marginLeft: -30,
                        backgroundColor: 'white',
                        width: wp(40),
                    }
                }}
            >
                <MenuItem 
                    text="Profile"
                    action={handleProfile}
                    value={null}
                    icon={<Feather name="user" size={hp(2.5)} color="grey" />}    
                />
                <Divider />
                <MenuItem 
                    text="Log out"
                    action={handleLogout}
                    value={null}
                    icon={<MaterialIcons name="logout" size={hp(2.5)} color="grey" />}    
                />
            </MenuOptions>
        </Menu>

    </View>
</View>
  );
}

const Divider = () => {
    return (
        <View className="h-[1px] bg-neutral-200" />
    )
}