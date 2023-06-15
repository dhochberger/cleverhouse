import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput,Image} from 'react-native'
import { AppColors } from '../constants/Styleguide';

export default function InputBox(props) {

  const { wrapperStyle, placeholder, onChangeText = (text) => console.log(text) } = props

  return (
    <View style={[styles.inputWrapper, wrapperStyle]}>
      <TextInput onChangeText={onChangeText} style={styles.titleText} placeholder={placeholder} placeholderTextColor="black" {...props}/>
    </View>
  )
}


const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: '#B4A7AF',
    //padding: "0.5rem",
     borderRadius: 20,
     marginBottom: 10,
    // width: "80vw",
    opacity: 0.85
  },
  titleText: {
    color: "black",
    fontSize: 14
  }
});
