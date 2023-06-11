import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    SafeAreaView
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements'
import ChatService from '../services/ChatService';
import appTheme from "../../theme";
import {decodeToken} from "../services/AuthService";
import {claims} from "../../config";
import * as Device from "expo-device";
import {getMessages} from "../services/MessageService";
import {getChat} from "../services/ChatsService";


const ChatScreen = ({ route }) => {
    const height = useHeaderHeight();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [chatService, setChatService] = useState(null);
    const [chatId, setChatId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [sendable, setSendable] = useState(false)
    const [chat, setChat] = useState({})
    const scrollViewRef = useRef();
    const behavior = Device.deviceName === 'iPhone' ? 'padding' : 'height';


    useEffect(() => {
        const initializeConnection = async () => {
            const tokenInfo = await decodeToken();
            setUserId(Number.parseInt(tokenInfo[claims.id]));
            const service = new ChatService();
            await service.initializeConnection();
            const id  = route.params.chatId;
            setChatId(id);
            setChat(await getChat(id))
            setMessages(await getMessages(id));
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
            setSendable(false)
        } catch (error) {
            console.log('Error sending message to API:', error);

        }
    };

    const getSendable = () => {
        return sendable
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: appTheme.COLORS.white }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    {chat.name}
                </Text>
            </View>
            <ScrollView
                style={styles.messages}
                contentContainerStyle={{ flexGrow: 1 }}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {messages.map((message, index) => (
                    message.senderId === userId ?
                        <View>
                            <View style={styles.messageBlock2} key={index}>
                                <Text style={styles.messageText}>{message.text}</Text>
                                <Text style={styles.messageSender}>{message.senderName}</Text>
                                <Text style={styles.messageTime}>{message.time}</Text>
                            </View>
                        </View> :
                    <View style={styles.messageBlock} key={index}>
                        <Text style={styles.messageText}>{message.text}</Text>
                        <Text style={styles.messageSender}>{message.senderName}</Text>
                        <Text style={styles.messageTime}>{message.time}</Text>
                    </View>
                ))}
            </ScrollView>
            <KeyboardAvoidingView
                keyboardVerticalOffset={height + 37}
                behavior={behavior}
                style={styles.keyboardAvoidingContainer}
            >
                <TextInput
                    style={styles.messageInput}
                    value={inputMessage}
                    onChangeText={(text) => {
                        setInputMessage(text)
                        if (text !== '') {
                            setSendable(true)
                        } else {
                            setSendable(false)
                        }
                    }}
                />
                <TouchableOpacity
                    style={getSendable() ? styles.sentBtn : styles.disabledBtn}
                    onPress={handleSendMessage}
                    disabled={!sendable}
                >
                    <Text
                    style={ styles.sentText}
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
    disabledBtn:{
        borderWidth: 1,
        borderRadius: 20,
        borderColor: appTheme.COLORS.secondary,
        backgroundColor: appTheme.COLORS.secondary
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
