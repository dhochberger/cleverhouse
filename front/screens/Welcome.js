import React, { useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputBox from '../components/InputBox';
import MainButton from '../components/MainButton';
import { AppColors } from '../constants/Styleguide';
import RoomButton from '../components/RoomButton'


function welcomePage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(password);
    const [room, setRoom]=useState([]);
    const [device, setDevice]=useState([]);
    const image = { uri: "https://i.pinimg.com/originals/f4/68/90/f4689079325e15730f295e8a37a8ec5a.jpg" };
    const roomsColors = ["#CC6984","#498E7B","#497F8E","#8E5849"]
    const roomsIcons = [
      "https://image.flaticon.com/icons/png/512/333/333519.png",
      "https://image.flaticon.com/icons/png/512/2869/2869122.png",
      "https://image.flaticon.com/icons/png/512/2933/2933754.png",
      "https://image.flaticon.com/icons/png/512/82/82490.png",
    ]

    const devicesIcons = [
      "https://image.flaticon.com/icons/png/128/702/702814.png",
      "https://image.flaticon.com/icons/png/128/289/289759.png",
      "https://image.flaticon.com/icons/png/128/1530/1530297.png",
      "https://image.flaticon.com/icons/png/128/638/638172.png",
    ]


    //   const {navigate} = useNavigation();
    //const {setUserId, setUser, id} = props.userStore;

    /*const login = async () => {
      try {
        const user = await loginUser(email, password);
        console.log('Successfully login', user);
        await AsyncStorage.setItem('userToken', user.id);
        setUserId(user.id);
        setUser(user);
        console.log(id);
      } catch (err) {
        alert(err);
      }
    };
  */
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
            <Text style={styles.titleHead}>Home</Text>   
             <RoomButton title={"Room 1"}/>
            </ImageBackground>
        </SafeAreaView>
        
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(91, 143, 87, 0.6)',  
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
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
  
});

export default welcomePage;
