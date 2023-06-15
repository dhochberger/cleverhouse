import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputBox from '../components/InputBox';
import MainButton from '../components/MainButton';
import {AppColors} from '../constants/Styleguide';
import { useNavigation } from '@react-navigation/native';
//import CloseButton from '../components/CloseButton';
//import {useNavigation} from '@react-navigation/native';

function Register(props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {navigate} = useNavigation()

  const image = { uri: "https://i.pinimg.com/originals/f4/68/90/f4689079325e15730f295e8a37a8ec5a.jpg" };
  return (
    <View style={styles.container}>
    <ImageBackground source={image} style={styles.image}>
    <TouchableOpacity
       onPress={() => navigate("Register")}
        style={styles.goBack}>
        <Text style={styles.arrow}>←</Text>
      </TouchableOpacity>
      <StatusBar barStyle="light-content" />
      {/* <CloseButton /> */}
      <Text style={styles.titleText}>Register</Text>
      <View style={styles.deviceWrapper}>
        <InputBox
          placeholder="Username"
          //onChangeText={(text) => setUsername(text)}
          wrapperStyle={{marginBottom: 20}}
          autoCapitalize="none"
          textAlign= "center"
          style = {styles.inputStyle}
        />
        <InputBox
          placeholder="Password"
         // onChangeText={(text) => setEmail(text)}
         // wrapperStyle={{marginBottom: 20}}
          keyboardType="email-address"
          textAlign= "center"
          autoCapitalize="none"
          style = {styles.inputStyle}
        />
        <InputBox
          placeholder="Confirm password"
         // onChangeText={(text) => setPassword(text)}
         // wrapperStyle={{marginBottom: 20}}
          secureTextEntry={true}
          textAlign= "center"
          autoCapitalize="none"
          style = {styles.inputStyle}
        />
      
      <MainButton style = {styles.inputStyle}  title="Confirm" onPress={() => navigate("Welcome")} />
      </View>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#B4A7AF',
  },
  inputStyle:{
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    color:'black',
  },
  goBack:{
    opacity: 0.85,
    backgroundColor:'#756D72',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 10,
    borderRadius: 100,
  },
  arrow: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "center",
  },
  deviceWrapper:{
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 65,
    paddingBottom: 5,
   
    justifyContent: "center"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
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
    textShadowColor:'#585858',
    textShadowOffset:{width: 5, height: 5},
    textShadowRadius:10,
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

export default Register;
