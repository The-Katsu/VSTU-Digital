import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import AuthScreen from './src/screens/AuthScreen';
import Chats from './src/screens/ChatsScreen';
import Chat from './src/screens/ChatScreen';
import * as Font from 'expo-font';
import UserProfileScreen from "./src/screens/UserProfileScreen";

const Stack = createStackNavigator();
export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);
    useEffect( () => {
            (async () => {
                    await Font.loadAsync({
                        'Montserrat-Medium': require('./assets/Montserrat-Medium.ttf'),
                    });
                    setFontLoaded(true);
                }
            )();
        }
    , []);
    
    if(!fontLoaded) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Auth" component={AuthScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Chats" component={Chats} options={{headerShown: false}}/>
                <Stack.Screen name="Chat" component={Chat}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Profile" component={UserProfileScreen}/>
                <Stack.Screen name="Details" component={DetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}