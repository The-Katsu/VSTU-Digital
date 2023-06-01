import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "../../config";

export const getMessages = async (chatId) => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_URL}/Messages/${chatId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })

    if (response.ok) {

        return await response.json();
    } else {
        throw new Error('error fetching messages')
    }
}