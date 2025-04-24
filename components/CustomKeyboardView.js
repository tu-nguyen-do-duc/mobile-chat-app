import { View, Text, Keyboard, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { Children } from 'react'

const ios = Platform.OS == 'ios';
export default function CustomKeyboardView({children}) {
  return (
    <KeyboardAvoidingView
        behavior={ios? "padding" : "height"}
        style={{
            flex: 1,
            backgroundColor: 'white',
        }}
    >
        <ScrollView
            style={{flex: 1}}
            bounces={false}
            showVerticalScrollIndicator={false}
        >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
      
  )
}