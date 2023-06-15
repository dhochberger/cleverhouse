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

export const LoginComponent: FunctionComponent<Props> = ({ onPress, type, switchLogin }) => {
    React.useEffect(() => {}, [])

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    return (
        <View style={styles.container}>
            <View style={styles.component}>
                <Input
                    placeholder="Email / Username"
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    onChangeText={value => setLogin(value)}
                    errorStyle={{ color: 'red' }}
                    //errorMessage="Username incorrecte"
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={value => setPassword(value)}
                    secureTextEntry={true}
                    errorStyle={{ color: 'red' }}
                    //errorMessage="Password inccorecte"
                />
                <Button
                    title="Login"
                    onPress={() => onPress(type, { login, password, confirmPassword })}
                    disabled={login.length < 1 || password.length < 1}
                    style={{ alignSelf: 'center', width: '85%' }}
                />
                <Text h4 onPress={() => switchLogin(false)}>
                    {"Don't have an account ? Click here"}
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
    component: {
        display: 'flex',
        width: '100%',
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
