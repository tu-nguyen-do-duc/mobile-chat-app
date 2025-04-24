import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function logIn() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Custom hook to check authentication status
  
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if(!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign in", "Please fill in all fields!")
      return
    }

    setLoading(true);
    let response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    console.log('got result: ', response);
    if(!response.success) {
      Alert.alert("Log In", response.msg);
    }
    // Login proccess
  }
  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View 
        style={{paddingTop: hp(8), paddingHorizontal: wp(5)}}
        className="flex-1 gap-12">
        {/* Log in image */}
        <View className="items-center">
          <Image 
            style={{height: hp(25)}} 
            resizeMode='contain'
            source={require('../assets/images/login.png')} />  
        </View>

        {/* Log in text */}
        <View className="gap-3">
          <Text style={{fontSize: hp(4)}} className="font-bold tracking-wider text-center text-neutral-800">Log In</Text>  
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
          <Text style={{fontSize: hp(1.5)}} className="text-neutral-800 text-center font-semibold">Forgot password?</Text>  
        </View>

        {/* Submit button */}
        <View>
          {loading ? (
            <View className="flex-row justify-center">
              <Loading size={hp(7)} />
            </View>

          ):(
          
            <TouchableOpacity onPress={handleLogin} style={{height: hp(6.5)}} className="bg-indigo-500 rounded-xl justify-center items-center">
              <Text style={{fontSize: hp(2.5)}} className="text-white font-bold tracking-wider">Log In</Text>
            </TouchableOpacity>)}
        </View>

        {/* Other text */}

        <View className="flex-row gap-1 items-center justify-center">
          <Text style={{fontSize: hp(1.8)}} className="text-neutral-800 font-semibold">Don't have an account?</Text>
          <Pressable onPress={() => router.push('/signUp')}>
            <Text style={{fontSize: hp(1.8)}} className="text-indigo-500 font-bold">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </CustomKeyboardView>
  )
}