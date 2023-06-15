import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import roomsPage from '../screens/roomsPage.js';
import Register from '../screens/Register.js';
import welcomePage from '../screens/Welcome.js';
import sharePage from '../screens/sharePage.js';
import recoveryPage from '../screens/recoveryPage.js';
import simulationPage from '../screens/simulationPage';
import planningPage from '../screens/planningPage';
import houseInfoPage from '../screens/houseInfoPage';
import { AppColors } from '../constants/Styleguide';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


function Tabs() {

    return (
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={welcomePage} />
                    <Tab.Screen name="Rooms" component={roomsPage} />
                    <Tab.Screen name="Planning" component={planningPage} />
                    <Tab.Screen name="House Info" component={houseInfoPage} />
                    <Tab.Screen name="Simulation" component={simulationPage} />
                    <Tab.Screen name="Recovery" component={recoveryPage} />
                    <Tab.Screen name="Share" component={sharePage} />
                </Tab.Navigator> 
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.backgroundColor,
        alignItems: 'center',
        padding: 30,
    },
    titleText: {
        color: 'white',
        flexDirection: 'row',
        alignSelf: 'stretch',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 32,
    },
    buttonText: {
        color: 'white',
        flexDirection: 'row',
        alignSelf: 'stretch',
        fontSize: 15,
        fontWeight: '600',
    },
    closeButton: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        paddingBottom: 20,
        paddingLeft: 20,
    },
});
const Tab = createBottomTabNavigator();

export default Tabs