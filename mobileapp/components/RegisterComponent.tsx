import * as React from 'react'
import { FunctionComponent, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import { View } from '../components/Themed'

interface Props {
    onPress: (type: string, body: any) => void
    type: 'login' | 'register'
    switchLogin: (bool: boolean) => void
}

export const RegisterComponent: FunctionComponent<Props> = ({ onPress, type, switchLogin }) => {
    React.useEffect(() => {}, [])

    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', width: '100%' }}>
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={value => setEmail(value)}
                    errorStyle={{ color: 'red' }}
                    style={styles.input}
                    //errorMessage="Username incorrecte"
                />
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={value => setUsername(value)}
                    errorStyle={{ color: 'red' }}
                    style={styles.input}
                    //errorMessage="Username incorrecte"
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={value => setPassword(value)}
                    secureTextEntry={true}
                    errorStyle={{ color: 'red' }}
                    style={styles.input}
                    //errorMessage="Password inccorecte"
                />
                <Input
                    placeholder="Confirm Password"
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={value => setConfirmPassword(value)}
                    secureTextEntry={true}
                    errorStyle={{ color: 'red' }}
                    style={styles.input}
                    //errorMessage="Password inccorecte"
                />
                <Button
                    title="Register"
                    onPress={() => onPress(type, { email, username, password, confirmPassword })}
                    disabled={
                        username.length < 1 || email.length < 1 || password.length < 1 || confirmPassword.length < 1
                    }
                    style={{ alignSelf: 'center', width: '85%' }}
                />
                <Text h4 onPress={() => switchLogin(true)}>
                    {'Already have an account ? Click here'}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    input: {
        color: 'white',
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
