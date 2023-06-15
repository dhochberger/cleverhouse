import getAxios from './axios'
import { GET_REQUEST, SERVER_URL } from '../config/api'
import { getItem, setItem, removeItem } from '../utils/asyncStorage'

const USERS_URL = `${SERVER_URL}/users`

const axios = getAxios()

const login = async (body: any) => {
    const resp = await axios.post(`${USERS_URL}/login`, body, GET_REQUEST)
    if (!resp.data) throw 'error login'
    setItem('jwtToken', resp.data.data.jwtToken)
    setItem('refreshToken', resp.data.data.refreshToken)
    setItem('user', resp.data.data.user)
    return resp.data
}

const register = async (body: any) => {
    const resp = await axios.post(`${USERS_URL}/register`, body, GET_REQUEST)
    if (!resp.data) throw 'error register'
    return resp.data
}

export { login, register }
