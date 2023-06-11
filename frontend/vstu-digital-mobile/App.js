import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import AuthScreen from './src/screens/AuthScreen';
import Chats from './src/screens/ChatsScreen';
import Chat from './src/screens/ChatScreen';
import * as Font from 'expo-font';
import UserProfileScreen from "./src/screens/UserProfileScreen";
import appTheme from "./theme";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    `Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45.`,
    `Warning: Each child in a list should have a unique "key" prop.`,
    `Sending \`onAnimatedValueUpdate\` with no listeners registered.`
]);
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
                    gestureEnabled: false

                }}/>
                <Stack.Screen name="Chat" component={Chat} options={{headerShown: false, }}/>
                <Stack.Screen name="Profile" component={UserProfileScreen} options={{
                    title: 'Профиль',
                    headerStyle: [{
                        backgroundColor: appTheme.COLORS.primary,
                    }],
                    headerLeft: () => {},
                    headerTitleStyle: [{
                       fontFamily: appTheme.FONTS.montserratMedium,
                        color: appTheme.COLORS.white,
                        fontSize: 20
                    }],

                }}/>
                <Stack.Screen name="Details" component={DetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}