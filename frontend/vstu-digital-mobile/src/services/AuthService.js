import { API_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export const getProfile = async () => {
    const token = await AsyncStorage.getItem('token')
    const response = await fetch(`${API_URL}/Account/getProfile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.ok) {
        return await response.json()
    } else {
        return { }
    }
}

export const verifyToken = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_URL}/Account/isAuthenticated`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return response.ok;
}

export const decodeToken = async () => {
    const token = await AsyncStorage.getItem('token');
    const decoded = jwt_decode(token);
    console.log(decoded);
    return decoded;
}

export const signIn = async (username, password) => {
    const response = await fetch(`${API_URL}/Account/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    if (response.ok) {
        const data = await response.json();
        const token = data.token;
        await AsyncStorage.setItem('token', token);
    } else {
        const error = await response.text();
        throw new Error(error)
    }
}

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
            console.log(JSON.stringify({
                username: username,
                password: password
            }))
            throw new Error('Unable to login');
        }

        const data = await response.json();
        await AsyncStorage.setItem('token', data.token)
        return data.token;
    }

    async logout() {
        await AsyncStorage.clear;
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
