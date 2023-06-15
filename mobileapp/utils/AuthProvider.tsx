import * as React from 'react'
import { getItem as getToken, setItem as setToken, removeItem as removeToken } from './asyncStorage'

const AuthContext = React.createContext({
    status: 'idle',
    jwtToken: null,
    signIn: () => {},
    signOut: () => {},
})
export const useAuthorization = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('Error')
    }
    return context
}
export const AuthProvider = (props: any) => {
    const [state, dispatch] = React.useReducer(reducer, {
        status: 'idle',
        jwtToken: null,
    })
    /*React.useEffect(() => {
        const initState = async () => {
            console.log('?')
            try {
                const jwtToken = await getToken('jwtToken')
                if (jwtToken !== null) {
                    dispatch({ type: 'SIGN_IN', token: jwtToken })
                } else {
                    dispatch({ type: 'SIGN_OUT' })
                }
            } catch (e) {
                console.log(e)
            }
        }
        initState()
    }, [state, dispatch])*/
    const actions = React.useMemo(
        () => ({
            signIn: async (token: string) => {
                dispatch({ type: 'SIGN_IN', token })
                await setToken('jwtToken', token)
            },
            signOut: async () => {
                dispatch({ type: 'SIGN_OUT' })
                await removeToken('jwtToken')
            },
        }),
        [state, dispatch]
    )
    return <AuthContext.Provider value={{ ...state, ...actions }}>{props.children}</AuthContext.Provider>
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SIGN_OUT':
            return {
                ...state,
                status: 'signOut',
                jwtToken: null,
            }
        case 'SIGN_IN':
            return {
                ...state,
                status: 'signIn',
                jwtToken: action.token,
            }
    }
}
