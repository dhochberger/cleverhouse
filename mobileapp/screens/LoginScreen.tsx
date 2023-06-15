import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { View } from '../components/Themed'
import { LoginComponent } from '../components/LoginComponent'
import { RegisterComponent } from '../components/RegisterComponent'
import { FunctionComponent, useState, useEffect } from 'react'
import { login, register } from '../api/auth'
import { setItem, getItem } from '../utils/asyncStorage'

export const LoginScreen: FunctionComponent = ({ ...props }: any) => {
    const [isLogin, setIsLogin] = useState<boolean>(true)

    const onConnect = async (type: string, body: any) => {
        switch (type) {
            case 'login':
                await login(body).then(loginRes => {
                    setItem('jwtToken', loginRes.data.jwtToken)
                    props.navigation.navigate('Root')
                })
                break
            case 'register':
                await register(body).then(async res => {
                    await login({ login: res.data.email, password: body.password }).then(loginRes => {})
                })
                break
            default:
                return
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.component}>
                {isLogin ? (
                    <LoginComponent type={'login'} onPress={onConnect} switchLogin={setIsLogin} />
                ) : (
                    <RegisterComponent type={'register'} onPress={onConnect} switchLogin={setIsLogin} />
                )}
            </View>
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
    component: {
        display: 'flex',
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
