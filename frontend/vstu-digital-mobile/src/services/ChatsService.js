import {API_URL, claims} from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {decodeToken} from "./AuthService";

export const createChat = async (name, groups) => {
    const token = await AsyncStorage.getItem('token');
    const decodedToken = await decodeToken();
    const response = await fetch(`${API_URL}/Chat/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            creatorId: decodedToken[claims.id],
            chatName: name,
            groups: groups
        }),
    });

    if (response.ok) {
        return await response.json();
    } else {
        console.log(await response.json())
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