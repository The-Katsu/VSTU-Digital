import React, {useEffect, useState} from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import AuthForm from '../components/AuthForm';
import AuthService, {signIn, verifyToken} from '../services/AuthService';
import ErrorAlert from "../components/ErrorAlert";

function AuthScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        verifyToken().then((data) => {
            //if (data) { navigation.navigate('Chats') }
        })
    }, [])

    const handleLogin = () => {
        console.log(123)
        signIn(username, password)
            .then(() => navigation.navigate('Chats'))
            .catch((e) => {
                setError(e.message);
                setShowModal(true);
            });
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

            <Image
                style={{resizeMode: 'contain',width: 350, height: 350}}
                source={require('../../assets/Logo_vstu_rus.png')}/>
            <AuthForm
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                handleLogin={() => handleLogin()}
            />

            <ErrorAlert
                visible={showModal}
                error={error}
                label={'Ошибка авторизации'}
                onClose={() => setShowModal(false)}/>

        </View>
    );
}

export default AuthScreen;
