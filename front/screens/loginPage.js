import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Button,
  Alert
} from 'react-native';
import InputBox from '../components/InputBox';
import MainButton from '../components/MainButton';
import { useNavigation } from '@react-navigation/native';

function loginPage(props) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState(password);
   const {navigate} = useNavigation()
    const image = { uri: "https://i.pinimg.com/originals/f4/68/90/f4689079325e15730f295e8a37a8ec5a.jpg" };
 
    return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.titleText}>Login </Text>
      <View style={styles.deviceWrapper}>
        <InputBox
          placeholder="User ID"
          onChangeText={(text) => setEmail(text)}
          wrapperStyle={{marginBottom: 20}}
          keyboardType="email-address"
          autoCapitalize="none"
          style = {styles.inputStyle}
          textAlign= "center"
        />
        <InputBox
        placeholder="House ID"
        onChangeText={(text) => setEmail(text)}
        wrapperStyle={{marginBottom: 20}}
        keyboardType="email-address"
        autoCapitalize="none"
        style = {styles.inputStyle}
        textAlign= "center"
      />
     <TouchableOpacity
       onPress={() => Alert.alert("info","this is your specific house ID received in you mail")}
        style={styles.button}>
        <Text>?</Text>
      </TouchableOpacity>
        
        <InputBox
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          wrapperStyle={{marginBottom: 20}}
          secureTextEntry={true}
          style = {styles.inputStyle}
          textAlign= "center"
        /> 
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.buttonText}>Forgot your password ?</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.deviceWrapper}>
       <MainButton title="Sign in" style = {styles.inputStyle} onPress={() => alert("log in pressed")} /> 
       <TouchableOpacity style={styles.closeButton} onPress={() => navigate("Register")}>
          <Text style={styles.buttonText}>No account ? Click here</Text>
        </TouchableOpacity>
       </View>
       </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B4A7AF',
    },
    
    inputStyle:{
      paddingVertical: 15,
      width: 250,
      paddingHorizontal: 15,
      color:'black',
    },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  deviceWrapper:{
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //maxHeight: '55vh',
     marginBottom: 65,
    paddingBottom: 5,
    // overflow: 'scroll',
    justifyContent: "center"
  },

  titleText: {
    color: 'black',
    flexDirection: 'row',
    alignSelf: 'stretch',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonText: {
    color: 'black',
    flexDirection: 'row',
    alignSelf: 'stretch',
    fontSize: 15,
    fontWeight: '600',
    textAlign: "center"
  },
  closeButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingBottom: 20,
    paddingLeft: 20,
  },
  button:{
    opacity: 0.85,
    backgroundColor:'#B4A7AF',
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 10,
    borderRadius: 100,
  },
});

export default loginPage;
