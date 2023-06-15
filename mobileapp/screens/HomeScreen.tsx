import * as React from 'react'
import { Switch, Button, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { View } from '../components/Themed'
import Rooms from '../components/Room'
import DeviceComponent from '../components/Device'
import { getItem, setItem } from '../utils/asyncStorage'
import { useState, useEffect } from 'react'
import { getDevices } from '../api/devices'
import { Device } from '../types/devices'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DefaultModal } from '../components/DefaultModal'

export default function HomeScreen({ ...props }: any) {
    const [token, setToken] = useState()

    const setItem = async () => {
        const token = await getItem('jwtToken')
        setToken(token)
        if (!token) props.navigation.navigate('Login')
    }

    useEffect(() => {
        setItem()
    }, [])

    const [devices, setDevices] = useState<Device[]>([])
    const [selectedDevice, setSelectedDevice] = useState<number | null>(null)
    const [isEnabled, setIsEnabled] = useState<boolean>(false)

    const getAllDevices = async () => {
        const devices = await getDevices()
        setDevices(devices.data)
    }

    useEffect(() => {
        getAllDevices()
    }, [])

    const [isModalVisible, setIsModalVisible] = React.useState(false)
    const handleModal = (idDevice?: number) => setIsModalVisible(old => !old)

    useEffect(() => {
        console.log('isModal', isModalVisible)
    }, [isModalVisible])
    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', width: '100%' }}>
                <Text h2>Rooms</Text>
                <Rooms label={'Test'} icon={''} color={'#B4A7AF'} />
            </View>
            <View>
                <Text h2>Devices</Text>
                {devices.map((item, index) => {
                    return (
                        <DeviceComponent
                            key={index}
                            setModalVisible={() => handleModal(item.idDevice)}
                            onPress={() => setSelectedDevice(item.idDevice)}
                            label={item.idDevice.toString()}
                            icon={''}
                        />
                    )
                })}
            </View>
            <DefaultModal isVisible={isModalVisible} onBackdropPress={() => handleModal()}>
                <DefaultModal.Container>
                    <DefaultModal.Header title={selectedDevice?.toString() ?? ''} />
                    <DefaultModal.Body>
                        <View style={styles.modalBody}>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsEnabled(old => !old)}
                                value={isEnabled}
                            />
                            <Text style={styles.modalText}>{isEnabled ? 'Activé' : 'Désactivé'}</Text>
                        </View>
                    </DefaultModal.Body>
                </DefaultModal.Container>
            </DefaultModal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
    },
    modalBody: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '',
    },
    modalText: {
        fontSize: 16,
        fontWeight: '400',
        marginLeft: '1rem',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
