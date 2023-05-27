import {API_URL} from "../../config";
import AuthService from '../services/AuthService';
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

class ChatsService {

    async getChats() {
        const authService = new AuthService();
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}/Chat/getAll`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async createChat(name) {
        const authService = new AuthService();
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: name
                }),
            });
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
}

export default ChatsService;
