import React, { Component } from 'react';

import { AppRegistry, StyleSheet, Text, View, TouchableOpacity ,Alert} from 'react-native';
import { AppColors } from '../constants/Styleguide';

export default function RoomButton({title = "title", onPress = () => console.log("button pressed"), style}) {
  return (
    <TouchableOpacity style={[styles.buttonWrapper, style]} onPress={onPress}>
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: AppColors.accentColor,
    //alignSelf: "stretch",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    //alignItems: "center"
  },
  titleText: {
    color: "white",
    fontWeight: "700"
  }
});
