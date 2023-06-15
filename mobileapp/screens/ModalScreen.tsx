import { FontAwesome5 } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Modal as RNModal, Pressable, StyleSheet } from 'react-native'

type ModalProps = {
    visible: boolean
    setVisible: (visible: boolean) => void
    children: React.ReactNode
}

export default function Modal({ visible, setVisible, children }: ModalProps) {
    const { colors } = useTheme()

    return (
        <RNModal transparent visible={visible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalCloseButton}>
                        <Pressable onPress={() => setVisible(!visible)}>
                            <FontAwesome5 name="times" size={18} color={colors.text} />
                        </Pressable>
                    </View>
                    <View style={styles.content}>{children}</View>
                </View>
            </View>
        </RNModal>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems: 'flex-end',
    },
    modalCloseButton: {
        paddingTop: 12,
        paddingRight: 15,
    },
    content: {
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
})
