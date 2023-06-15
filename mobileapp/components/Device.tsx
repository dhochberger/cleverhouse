import React, { FunctionComponent, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Image } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modal from '../screens/ModalScreen'

interface Props {
    icon: string
    label: string
    setModalVisible: () => void
    onPress?: () => void
}

const DeviceComponent: FunctionComponent<Props> = ({ icon, label, setModalVisible }) => {
    return (
        <TouchableOpacity onPress={setModalVisible}>
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <Image
                        source={{ uri: icon }}
                        resizeMode="contain"
                        style={{ width: '12vw', height: '12vw', marginBottom: '0.6rem', marginHorizontal: '1rem' }}
                    />
                    <Text style={styles.itemText}>{label}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#B4A7AF',
        padding: '0.5rem',
        borderRadius: 20,
        margin: 7,
        width: '80vw',
        opacity: 0.85,
    },
    itemLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    itemText: {
        maxWidth: '80%',
        color: '#FFF',
        fontSize: 15,
    },
})

export default DeviceComponent
