import getAxios from './axios'
import { GET_REQUEST, SERVER_URL } from '../config/api'

const DEVICES_URL = `${SERVER_URL}/devices`

const axios = getAxios()

const getDevices = async () => {
    const resp = await axios.get(`${DEVICES_URL}`, GET_REQUEST)
    return resp.data
}

export { getDevices }
