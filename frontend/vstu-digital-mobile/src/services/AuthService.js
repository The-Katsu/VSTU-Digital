import { API_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
    async login(username, password) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error('Unable to login');
        }

        const data = await response.json();
        return data.token;
    }

    async getToken() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                return token;
            }
        } catch (e) {
            console.log('Error getting chat token from AsyncStorage: ', e);
        }
    };
}

export default AuthService;