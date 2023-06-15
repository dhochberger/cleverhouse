import getAxios from './axios'
import { GET_REQUEST, SERVER_URL } from '../config/api'

const ROOMS_URL = `${SERVER_URL}/rooms`

const axios = getAxios()

const getRooms = async () => {
    const resp = await axios.get(`${ROOMS_URL}`, GET_REQUEST)
    return resp
}

export { getRooms }
