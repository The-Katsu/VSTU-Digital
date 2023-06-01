import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import appTheme from "../../theme";
import {verifyToken} from "../services/AuthService";

function HomeScreen({ navigation }) {
    useEffect(() => {
        verifyToken()
            .then((data) => {
                if (data) {
                    navigation.navigate('Chats')
                } else {
                    navigation.navigate('Auth')
                }
            })
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: '70%' }}>
            <Image source={require('../../assets/Logo_vstu_rus.png')}
                   style={{resizeMode: 'contain',width: 350, height: 350}}
            />
            <Text
                style={{
                    fontFamily: appTheme.FONTS.montserratMedium,
                    color: appTheme.COLORS.primary,
                    fontWeight: 'bold',
                    fontSize: 24,
                    textAlign: 'center'
                }}
            >
                Добро пожаловать в мобильный модуль слушателя цифровой кафедры!
            </Text>
        </View>
    );
}

export default HomeScreen;
