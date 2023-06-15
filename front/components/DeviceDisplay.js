import React from 'react';
import { View, Text, StyleSheet,Image} from 'react-native';

const DeviceDisplay = (props) => {
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
            <Image
                  source= {props.icon}
                  resizeMode="contain"
                  style={{width: "12vw", height: "12vw", marginBottom: "0.6rem", marginHorizontal:"1rem"}}/>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#B4A7AF',
        padding: "0.5rem",
        borderRadius: 20,
        marginBottom: 10,
        width: "80vw",
        opacity: "0.85"
        
    },
    itemLeft: {
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center"
    },
    itemText: {
        maxWidth: '80%',
        color: '#FFF',
        fontSize: "1.2rem"

    }
});

export default DeviceDisplay;
