import {API_URL} from "../../config";
import AuthService from '../services/AuthService';

class ChatsService {

    async getChats() {
        const authService = new AuthService();
        const token = await authService.getToken();
        try {
            const response = await fetch(`${API_URL}/chats`, {
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
