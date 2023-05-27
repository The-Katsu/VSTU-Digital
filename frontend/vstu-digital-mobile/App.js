import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import AuthScreen from './src/screens/AuthScreen';
import Chats from './src/screens/ChatsScreen';
import Chat from './src/screens/ChatScreen';
import * as Font from 'expo-font';
import UserProfileScreen from "./src/screens/UserProfileScreen";
import appTheme from "./theme";

const Stack = createStackNavigator();

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect( () => {
            Font.loadAsync({
                'Montserrat-Medium': require('./assets/Montserrat-Medium.ttf'),
            }).then(() => setFontLoaded(true));
        }
    , []);
    
    if(!fontLoaded) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Auth" component={AuthScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Chats" component={Chats} options={{headerShown: false,
                    title: 'Список чатов',

                }}/>
                <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
                <Stack.Screen name="Profile" component={UserProfileScreen} options={{
                    title: 'Профиль',
                    headerStyle: [{
                        backgroundColor: appTheme.COLORS.secondary,

                    }],
                    headerLeft: () => {},
                    headerTitleStyle: [{
                       fontFamily: appTheme.FONTS.montserratMedium,
                        color: appTheme.COLORS.primary
                    }],

                }}/>
                <Stack.Screen name="Details" component={DetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}