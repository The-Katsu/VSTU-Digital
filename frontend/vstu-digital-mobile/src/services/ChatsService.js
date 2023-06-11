import {API_URL, claims} from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {decodeToken} from "./AuthService";

export const editChat = async (id, name, groups) => {
    const token = await AsyncStorage.getItem('token');
    const decodedToken = await decodeToken();
    console.log(JSON.stringify({
        id: id,
        name: name,
        groups: groups
    }))
    const response = await fetch(`${API_URL}/Chat/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            id: id,
            name: name,
            groups: groups
        }),
    });

    if (response.ok) {

    } else {
        console.log(response.status)
        throw new Error('Ошибка редактирования чата на сервере')
    }
}

export const deleteChat = async (id) => {
    const token = await AsyncStorage.getItem('token');
    console.log(`${API_URL}/Chat/delete/${id}`)
    const response = await fetch(`${API_URL}/Chat/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.ok) {

    } else {
        console.log(response.statusText)
        throw new Error('Ошибка удаления чата на сервере')
    }
}

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

export const getChat = async (id) => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_URL}/Chat/get/${id}`, {
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