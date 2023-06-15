import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const RoomDisplay = (props) => {
    return(
        <View style={itemStyle(props.color)}>
            <View style={styles.itemLeft}>
                <Image
                  source= {props.icon}
                  resizeMode="contain"
                  style={{width: "15vw", height: "15vw", marginBottom: "0.6rem"}}/>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
        </View>
    )
}
const itemStyle = function(opt){
    return {
        backgroundColor : opt ,
        padding: 5,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: "25vw",
        height: "25vw",
        margin : 7
    }
}

const styles = StyleSheet.create({
    itemLeft: {
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap',
        maxWidth: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 5
    },
    itemText: {
        maxWidth: '100%',
        color: '#FFF',
        alignText: 'center',
        fontSize: 12,
        display: 'block'
    }
});

export default RoomDisplay;
