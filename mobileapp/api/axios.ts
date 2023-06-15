import axiosLib, { AxiosInstance } from 'axios'
import { SERVER_URL } from '../config/api'
import { getItem, setItem, removeItem } from '../utils/asyncStorage'
import { NavigationActions } from 'react-navigation'

let instance: AxiosInstance | null = null
let isRefreshingToken = false
let subscribers: { (token: string): void }[] = []

function onAccessTokenFetched(token: string) {
    subscribers = subscribers.filter(callback => callback(token))
}

function addSubscriber(callback: { (token: string): void }) {
    subscribers.push(callback)
}

const axios = (): AxiosInstance => {
    if (instance) return instance
    instance = axiosLib.create({
        timeout: 45000,
    })

    instance.interceptors.request.use(async config => {
        // Set token
        const token = await getItem('jwtToken')
        config.headers.Authorization = token ? `Bearer ${token}` : ''

        return config
    })

    // Response interceptor for API calls
    instance.interceptors.response.use(
        response => response,
        async function (error) {
            const originalRequest = error.config
            // If unauthorized error
            if (!error.response) return Promise.reject(error)
            if (error.response.status === 401 && !originalRequest._retry) {
                if (!isRefreshingToken) {
                    isRefreshingToken = true
                    originalRequest._retry = true

                    const jwtToken = await getItem('jwtToken')
                    const refreshToken = await getItem('refreshToken')
                    // Refresh token
                    axiosLib
                        .post(
                            SERVER_URL + '/users/refreshtoken',
                            { refreshToken },
                            {
                                headers: {
                                    Authorization: `Bearer ${jwtToken}`,
                                },
                            }
                        )
                        .then(res => {
                            isRefreshingToken = false
                            console.log('res', res.data)
                            onAccessTokenFetched(res.data.token)
                            setItem('jwtToken', res.data.jwtToken)
                            setItem('refreshToken', res.data.refreshToken)
                        })
                        .catch(() => {
                            removeItem('jwtToken')
                            removeItem('refreshToken')

                            isRefreshingToken = false
                        })
                }

                const retryOriginalRequest = new Promise(resolve => {
                    addSubscriber((token: string) => {
                        //setItem('jwtToken', token)
                        // Set new token
                        originalRequest.headers.Authorization = 'Bearer ' + token
                        resolve(axiosLib(originalRequest))
                    })
                })
                return retryOriginalRequest
            }

            return Promise.reject(error)
        }
    )

    return instance
}

export default axios
