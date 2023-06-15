import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LogoutIcon from '../../assets/logout.svg';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {inject} from "mobx-react";

function LogoutButton ({userStore}) {

  // const {setUserId, setUser} = userStore
  // async function logout() {

  //   await AsyncStorage.removeItem('userToken');
  //   setUserId(null)
  // }

  return (
    <TouchableOpacity style={styles.closeButton} onPress={() => logout()}>
      <LogoutIcon width={18} height={18} fill="black" />
    </TouchableOpacity>
  );
};

export default inject("userStore")(LogoutButton)

const styles = StyleSheet.create({
  closeButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingBottom: 10,
    paddingLeft: 20,
  },
});
