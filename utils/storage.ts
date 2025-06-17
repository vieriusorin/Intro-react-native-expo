import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Get data from storage
 * @param key - The key to get the data from
 * @returns The data from the storage
 */
export async function getFromStorage(key: string) {
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Set data to storage
 * @param key - The key to set the data to
 * @param data - The data to set to the storage (could be any value that can be serialized to JSON string, number, boolean, array, object)
 */
export async function saveToStorage(key: string, data: object) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
}