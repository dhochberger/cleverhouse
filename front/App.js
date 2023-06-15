// import 'react-native-gesture-handler';
// //import React from 'react';
// import AppLoading from './src/screens/AppLoading';
// import { Provider } from 'mobx-react';
// import UserStore from './src/store/UserStore';
import loginPage from './screens/loginPage';
import Register from './screens/Register'
import welcomePage from './screens/Welcome';
import React, {useState} from 'react';
//import AuthStack from './navigation/navigation.js'
import AuthStack from './navigation/navigation'
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import InputBox from '../components/InputBox';
// import MainButton from '../components/MainButton';
// import {AppColors} from '../constants/Styleguide';
// import CloseButton from '../components/CloseButton';
// import {useNavigation} from '@react-navigation/native';
//import {loginUser} from '../api/API';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import {inject, observer} from 'mobx-react';

 
const App = () => {
  return (
    //Register()
    //loginPage()
    //welcomePage()  
    <AuthStack/>
  );
};

export default App;
