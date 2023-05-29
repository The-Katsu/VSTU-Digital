import {API_URL} from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createChat = async (name, groups) => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_URL}/Chat/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            groups: groups
        }),
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('error creating chat')
    }
}

export const getChats = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_URL}/Chat/get`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (response.ok) {
        return await response.json();
    } else {
        console.log(response.status)
        throw new Error('error fetching chats')
    }
}