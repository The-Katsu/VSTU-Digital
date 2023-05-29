import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform, SafeAreaView
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'
import ChatService from '../services/ChatService';
import appTheme from "../../theme";
import {decodeToken} from "../services/AuthService";
import {claims} from "../../config";

const ChatScreen = ({ route }) => {
    const height = useHeaderHeight();
    const [messages, setMessages] = useState([
        { text: "Здравствуйте", name: "Студент0 И.О.", time: "27/05/2023 12:12:02" },
        { text: "Когда пара ?", name: "Стдуент1 И.О.", time: "27/05/2023 12:17:23" },
        { text: "Коллеги, встречаемся в 14:00 в В-1401", name: "Учитель И.О.", time: "27/05/2023 12:19:51" },
    ]);
    const [inputMessage, setInputMessage] = useState('privet');
    const [chatService, setChatService] = useState(null);
    const [chatId, setChatId] = useState(0);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        decodeToken().then((data) => {
            setUserId(data[claims.id])
        })
        const initializeConnection = async () => {
            const service = new ChatService();
            await service.initializeConnection();
            const id  = route.params.chatId;
            setChatId(id);
            await service.startConnection(id);
            setChatService(service);
        };

        initializeConnection().then();

        return () => {
            chatService?.connection?.stop();
        };
    }, []);

    useEffect(() => {
        const handleIncomingMessage = (message) => {
            console.log(message)
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        chatService?.subscribeToIncomingMessages(handleIncomingMessage);

        return () => {
            chatService?.unsubscribeFromIncomingMessages(chatId);
        };
    }, [chatService]);

    const handleSendMessage = async () => {
        const { chatId } = route.params;

        try {
            await chatService?.sendMessageToAPI(chatId, inputMessage);
            setInputMessage('');
        } catch (error) {
            console.log('Error sending message to API:', error);

        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: appTheme.COLORS.white }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {"Тест СУБД"}
                </Text>
            </View>
            <ScrollView
                style={styles.messages}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {messages.map((message, index) => (
                    message.senderId == userId ?
                        <View>
                            <View style={styles.messageBlock2} key={index}>
                                <Text style={styles.messageText}>{message.text}</Text>
                                <Text style={styles.messageSender}>{'Авилов В.С.'}</Text>
                                <Text style={styles.messageTime}>{message.time}</Text>
                            </View>
                        </View> :
                    <View style={styles.messageBlock} key={index}>
                        <Text style={styles.messageText}>{message.text}</Text>
                        <Text style={styles.messageSender}>{message.name}</Text>
                        <Text style={styles.messageTime}>{message.time}</Text>
                    </View>
                ))}
            </ScrollView>
            <KeyboardAvoidingView
                keyboardVerticalOffset={height + 37}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingContainer}
            >
                <TextInput
                    style={styles.messageInput}
                    value={inputMessage}
                    onChangeText={setInputMessage}
                />
                <TouchableOpacity
                    style={styles.sentBtn}
                    onPress={handleSendMessage}
                >
                    <Text
                    style={styles.sentText}
                    >Отправить</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export const styles = StyleSheet.create({
    header: {
        height: '7%',
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderColor: appTheme.COLORS.primary
    },
    messages: {
        height: '90%'
    },
    keyboardAvoidingContainer: {
        marginTop: '3%',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    messageInput: {
        width: '65%',
        borderWidth: 1,
        borderRadius: 20,
        marginLeft: 5,
        marginRight: 5,
        fontSize: 20,
        fontFamily: appTheme.FONTS.montserratMedium,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: appTheme.COLORS.primary,
        color: appTheme.COLORS.primary
    },
    sentBtn: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: appTheme.COLORS.primary,
        backgroundColor: appTheme.COLORS.primary
    },
    sentText: {
        fontSize: 20,
        fontFamily: appTheme.FONTS.montserratMedium,
        color: appTheme.COLORS.white
    },
    messageBlock: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: appTheme.COLORS.primary,
        padding: 5,
        margin: 5,
        width: '70%'
    },
    messageLabel: {
        fontSize: 14,
        fontFamily: appTheme.FONTS.montserratMedium,
        color: appTheme.COLORS.primary
    },
    headerText: {
        fontSize: 38,
        fontFamily: appTheme.FONTS.montserratMedium,
        color: appTheme.COLORS.primary,
        textAlign: "center"
    },
    messageText: {
        fontSize: 14,
        fontFamily: appTheme.FONTS.montserratMedium,
        color: appTheme.COLORS.primary
    },
    messageSender: {
        fontSize: 12,
        fontFamily: appTheme.FONTS.montserratMedium,
        color: appTheme.COLORS.primary,
        textAlign: 'right'
    },
    messageTime: {
        fontSize: 12,
        fontFamily: appTheme.FONTS.montserratMedium,
        color: appTheme.COLORS.primary,
        textAlign: 'right'
    },
    messageBlock2: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: appTheme.COLORS.primary,
        padding: 5,
        margin: 5,
        width: '70%',
        marginLeft: '28%'
    }
});

export default ChatScreen
