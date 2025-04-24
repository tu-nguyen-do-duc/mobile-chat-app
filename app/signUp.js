import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Feather } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function signUp() {

  const router = useRouter();
  const { register } = useAuth(); // Custom hook to check authentication status
  const [loading, setLoading] = useState(false);
  
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profilePicRef = useRef("");

  const handleRegister = async () => {
    if(!emailRef.current || !passwordRef.current || !usernameRef.current || !profilePicRef.current) {
      Alert.alert("Sign Up", "Please fill in all fields!")
      return
    }
    setLoading(true);
    
    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profilePicRef.current);
    setLoading(false);

    console.log('got result: ', response);
    if(!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  }
  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View 
        style={{paddingTop: hp(7), paddingHorizontal: wp(5)}}
        className="flex-1 gap-12">
        {/* Sign up image */}
        <View className="items-center">
          <Image 
            style={{height: hp(25)}} 
            resizeMode='contain'
            source={require('../assets/images/register.png')} />  
        </View>

        {/* Sign up text */}
        <View className="gap-3">
          <Text style={{fontSize: hp(4)}} className="font-bold tracking-wider text-center text-neutral-800">Sign Up</Text>  

          <View style={{height: hp(7)}} className="flex-row gap-4 items-center justify-center bg-neutral-100 rounded-full px-4">
            <Feather name="user" size={hp(3)} color="grey" />
            <TextInput
                onChangeText={(text) => usernameRef.current = text}
                style={{height: hp(7), width: wp(70), fontSize: hp(2.5)}}
                placeholder='Username'
                placeholderTextColor={"grey"}
                className="text-neutral-800 flex-1 font-semibold"
                />
          </View>
          <View style={{height: hp(7)}} className="flex-row gap-4 items-center justify-center bg-neutral-100 rounded-full px-4">
            <AntDesign name="mail" size={hp(3)} color="grey" />
            <TextInput
                onChangeText={(text) => emailRef.current = text}
                style={{height: hp(7), width: wp(70), fontSize: hp(2.5)}}
                placeholder='Email'
                placeholderTextColor={"grey"}
                className="text-neutral-800 flex-1 font-semibold"
                />
          </View>
          
          <View style={{height: hp(7)}} className="flex-row gap-4 items-center justify-center bg-neutral-100 rounded-full px-4">
          <FontAwesome6 name="unlock-keyhole" size={hp(3)} color="grey" />
            <TextInput
                onChangeText={(text) => passwordRef.current = text}
                style={{height: hp(7), width: wp(70), fontSize: hp(2.5)}}
                placeholder='Password'
                placeholderTextColor={"grey"}
                className="text-neutral-800 flex-1 font-semibold"
                secureTextEntry={true}
                />
          </View>

          <View style={{height: hp(7)}} className="flex-row gap-4 items-center justify-center bg-neutral-100 rounded-full px-4">
            <FontAwesome name="file-picture-o" size={hp(3)} color="grey" />
            <TextInput
                onChangeText={(text) => profilePicRef.current = text}
                style={{height: hp(7), width: wp(70), fontSize: hp(2.5)}}
                placeholder='Profile Picture URL'
                placeholderTextColor={"grey"}
                className="text-neutral-800 flex-1 font-semibold"
                />
          </View>

        </View>

        {/* Submit button */}
        <View>
          {loading ? (
            <View className="flex-row justify-center">
              <Loading size={hp(7)} />
            </View>

          ):(
          
            <TouchableOpacity onPress={handleRegister} style={{height: hp(6.5)}} className="bg-indigo-500 rounded-xl justify-center items-center">
              <Text style={{fontSize: hp(2.5)}} className="text-white font-bold tracking-wider">Sign Up</Text>
            </TouchableOpacity>)}
        </View>

        {/* Other text */}

        <View className="flex-row gap-1 items-center justify-center">
          <Text style={{fontSize: hp(1.8)}} className="text-neutral-800 font-semibold">Already have an account?</Text>
          <Pressable onPress={() => router.push('/logIn')}>
            <Text style={{fontSize: hp(1.8)}} className="text-indigo-500 font-bold">Log In</Text>
          </Pressable>
        </View>
      </View>
    </CustomKeyboardView>
  )
}