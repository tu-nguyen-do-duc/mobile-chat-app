import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native';

export default function StartPage() {
    return (
        <View className="flex=1 justify-center items-center bg-white">
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}