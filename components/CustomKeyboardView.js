import { View, Text, Keyboard, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { Children } from 'react'

const ios = Platform.OS == 'ios';
export default function CustomKeyboardView({children, inChat}) {
    let kavConfig = {};
    let scrollViewConfig = {};
    if(inChat) {
        kavConfig= {keyboardVerticalOffset: 90};
        scrollViewConfig = {contentContainerStyle: {flex: 1}};
    }
  return (
    <KeyboardAvoidingView
        behavior={ios? "padding" : "height"}
        {...kavConfig}
        style={{
            flex: 1,
            backgroundColor: 'white',
        }}
    >
        <ScrollView
            style={{flex: 1}}
            bounces={false}
            showVerticalScrollIndicator={false}
            {...scrollViewConfig}
        >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
      
  )
}