import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//import Home from '../screens/Tabs/Home';
import Tabs from './tabs'
import roomsPage from '../screens/roomsPage.js';
import Register from '../screens/Register.js';
import Register2 from '../screens/Register2.js';
import Welcome from '../screens/Welcome.js';
import loginPage from '../screens/loginPage.js';
import planningPage from '../screens/planningPage.js';
import simulationPage from '../screens/simulationPage.js';
import sharePage from '../screens/sharePage.js';
import recoveryPage from '../screens/recoveryPage.js';

import { NavigationContainer } from '@react-navigation/native';
// import HomeIcon from '../../assets/home.svg';
// import {AppColors} from '../constants/Styleguide';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function AuthStack() {
  return (
<NavigationContainer>
<Stack.Navigator initialRouteName="loginPage" headerMode="none">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="tabs" component={Tabs} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Register2" component={Register2} />
      <Stack.Screen name="loginPage" component={loginPage} />
      <Stack.Screen name="roomsPage" component={roomsPage} />
      <Stack.Screen name="planningPage" component={planningPage} />
      <Stack.Screen name="simulationPage" component={simulationPage} />
      <Tab.Screen name="Recovery" component={recoveryPage} />
      <Tab.Screen name="Share" component={sharePage} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AuthStack;