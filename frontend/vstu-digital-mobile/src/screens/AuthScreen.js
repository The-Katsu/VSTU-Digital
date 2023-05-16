import React, { useState } from 'react';
import { View, Text } from 'react-native';
import AuthForm from '../components/AuthForm';
import AuthService from '../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AuthScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /*if(AsyncStorage.getItem != null) {
        navigation.navigate('Chats');
    }*/

    const handleLogin = async () => {
        try {
            const authService = new AuthService();
            const token = await authService.login(username, password);
            await AsyncStorage.setItem('token', token);
            navigation.navigate('Chats');
            console.log(token);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AuthForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={handleLogin}
            />
        </View>
    );
}

export default AuthScreen;
