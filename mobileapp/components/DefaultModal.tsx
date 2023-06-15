import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import Modal from 'modal-enhanced-react-native-web'

type ModalProps = {
    isVisible: boolean
    children: React.ReactNode
    onRequestClose?: () => void
    [x: string]: any
}

export const DefaultModal = ({ isVisible = false, children, onRequestClose, ...props }: ModalProps) => {
    return (
        <Modal
            animationType="slide"
            isVisible={isVisible}
            animationInTiming={300}
            animationOutTiming={300}
            backdropTransitionInTiming={300}
            backdropTransitionOutTiming={300}
            onRequestClose={onRequestClose}
            {...props}
        >
            {children}
        </Modal>
    )
}

const ModalContainer = ({ children }: { children: React.ReactNode }) => <View style={styles.container}>{children}</View>

const ModalHeader = ({ title }: { title: string }) => (
    <View style={styles.header}>
        <Text style={styles.text}>{title}</Text>
    </View>
)

const ModalBody = ({ children }: { children?: React.ReactNode }) => <View style={styles.body}>{children}</View>

const ModalFooter = ({ children }: { children?: React.ReactNode }) => <View style={styles.footer}>{children}</View>

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 24,
    },
    body: {
        justifyContent: 'center',
        paddingHorizontal: 15,
        minHeight: 100,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
    },
})

DefaultModal.Header = ModalHeader
DefaultModal.Container = ModalContainer
DefaultModal.Body = ModalBody
DefaultModal.Footer = ModalFooter
