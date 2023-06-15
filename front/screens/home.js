import React, {useState, useEffect} from 'react';
import { ImageBackground, ScrollView, KeyboardAvoidingView, StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import axios from 'axios';
import RoomDisplay from '../components/RoomDisplay';
import DeviceDisplay from '../components/DeviceDisplay';

const homeScreen = ({navigation}) => {
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

    function getRoomFromAPI() {
      axios.get('http://2e2ae0734d0d.ngrok.io/devices/all')
      .then((response) => {
        console.log(response)
        setRoom(response.data)
      })
    }
  
    function getDeviceFromAPI() {
      axios.get('http://2e2ae0734d0d.ngrok.io/devices/rooms')
      .then((response) => {
        console.log(response)
        setDevice(response.data)
      })
    }
  
    useEffect(() => {
      getRoomFromAPI();
      getDeviceFromAPI()
    }, [])
  
    return (
      
        <View style={styles.container}>
          <ImageBackground source={image} style={styles.image}>
            <Text style={styles.titleHead}>Home</Text>
            <Text style={styles.sectionTitle}>Rooms</Text>
            <View style={styles.roomWrapper}>
                {
                Object.values(room).map((key, index)=>{
                    return (     
                        <RoomDisplay icon={roomsIcons[Math.floor(Math.random()*roomsIcons.length)]} text={key.nameRoom} color={roomsColors[Math.floor(Math.random()*roomsColors.length)]}/>
                    )
                    })
                }
            </View>
            <Text style={styles.sectionTitle}>Devices</Text>
            <View style={styles.deviceWrapper}>
                {
                    Object.values(device).map((key, index)=>{
                        return (     
                            <DeviceDisplay icon = {devicesIcons[Math.floor(Math.random()*devicesIcons.length)]} text={key.devices.deviceName}/>
                        )
                    })
                }
            </View>
            </ImageBackground>
        </View>
        
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(91, 143, 87, 0.6)',
      },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    roomWrapper:{
      paddingTop: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      overflow: 'scroll'
    },
    deviceWrapper:{
      paddingTop: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxHeight: '55vh',
      marginBottom: 65,
      paddingBottom: 5,
      overflow: 'scroll',
      justifyContent: "center"
    },
    sectionTitle: {
      fontSize: 22,
      display: 'block',
      paddingLeft: 15,
      paddingRight: 15
    },
    titleHead: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 28,
      display: 'block'
    },
    items: {
      marginTop: 30
    },
    writeTaskWrapper:{
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    input: {
      paddingVertical: 15,
      width: 250,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColer: '#C0C0C0',
      borderWidth: 1
    },
    addWrapper: {
      width: 60,
      heigth: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColer: '#C0C0C0',
      borderWidth: 1
    },
    addText: {
  
    }
  });

  
export default homeScreen;
