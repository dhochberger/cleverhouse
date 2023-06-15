import AsyncStorage from '@react-native-async-storage/async-storage'
export async function getItem(type: string) {
    const value = await AsyncStorage.getItem(type)
    return value ? JSON.parse(value) : null
}
export async function setItem(type: string, value: any) {
    return AsyncStorage.setItem(type, JSON.stringify(value))
}
export async function removeItem(type: string) {
    return AsyncStorage.removeItem(type)
}
