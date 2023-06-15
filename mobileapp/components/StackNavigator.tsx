import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import NotFoundScreen from '../screens/NotFoundScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { RootStackParamList } from '../types/types'
import BottomTab from './BottomTab'
import { useState } from 'react'
import ModalScreen from '../screens/ModalScreen'

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createStackNavigator<RootStackParamList>()

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName={'Login'}>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Root" component={BottomTab} options={{ headerShown: false }} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Navigator>
    )
}
