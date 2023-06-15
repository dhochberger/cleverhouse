import React, { FunctionComponent, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native'
import { getRooms } from '../api/rooms'
import { Rooms } from '../types/rooms'
interface Props {
    icon: string
    label: string
    color: string
}
const Room: FunctionComponent<Props> = ({ icon, label, color }) => {
    const [rooms, setRooms] = useState<Rooms>()

    useEffect(() => {
        const rooms = getRooms()
        console.log('rooms', rooms)
    }, [])

    return (
        <View style={itemStyle(color)}>
            <View style={styles.itemLeft}>
                <Image
                    source={{ uri: icon }}
                    resizeMode="contain"
                    style={{ width: '15vw', height: '15vw', marginBottom: '0.6rem' }}
                />
                <Text style={styles.itemText}>{label}</Text>
            </View>
        </View>
    )
}
const itemStyle = (opt: string): StyleProp<ViewStyle> => {
    return {
        backgroundColor: opt,
        padding: 5,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '25vw',
        height: '25vw',
        margin: 7,
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
        padding: 5,
    },
    itemText: {
        maxWidth: '100%',
        color: '#FFF',
        fontSize: 12,
        display: 'flex',
    },
})

export default Room
