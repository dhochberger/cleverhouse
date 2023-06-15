import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AppColors } from '../constants/Styleguide';

export default function MainButton({title = "title", onPress = () => console.log("button pressed"), style}) {
  return (
    <TouchableOpacity style={[styles.buttonWrapper, style]} onPress={onPress}>
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: '#756D72',
    //padding: "0.5rem",
     borderRadius: 20,
     marginBottom: 10,
    // width: "80vw",
    opacity: 0.85
    
  },
  titleText: {
    color: "black",
    fontSize: 14,
    textAlign:"center"
  }
});
