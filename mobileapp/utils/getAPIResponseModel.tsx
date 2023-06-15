import { AxiosResponse } from 'axios'
import { APIException } from 'src/types'

const getAPIResponseModel = async <T,>(
    setLoader: (arg0: boolean) => void,
    request: () => Promise<AxiosResponse>,
    error: APIException
): Promise<AxiosResponse<T>> => {
    setLoader(true)
    try {
        const rawResponse = await request()
        setLoader(false)
        if (rawResponse.status >= 200 && rawResponse.status < 300) return rawResponse
        throw { response: { status: rawResponse.status } }
        //need to have explicit any to avoid 20+ catch
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        setLoader(false)
        if (error) {
            error.setErrorData(e?.response?.status ?? 0, e?.response?.data?.message ?? '')
            throw error
        }
        throw e
    }
}

export default getAPIResponseModel
