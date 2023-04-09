import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import ChatService from '../services/ChatService';

const ChatScreen = ({ route }) => {
    const [messages, setMessages] = useState([
        { text: "Hello", name: "Alice", time: "9:00 AM" },
        { text: "Hi there", name: "Bob", time: "9:01 AM" },
        { text: "How are you?", name: "Alice", time: "9:02 AM" },
    ]);
    const [inputMessage, setInputMessage] = useState('privet');
    const [chatService, setChatService] = useState(null);

    useEffect(() => {
        const initializeConnection = async () => {
            const service = new ChatService();
            await service.initializeConnection();
            const { chatId } = route.params;
            console.log(chatId)
            await service.startConnection(chatId);
            setChatService(service);
        };

        initializeConnection().then();

        return () => {
            chatService?.connection?.stop();
        };
    }, []);

    useEffect(() => {
        const handleIncomingMessage = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        chatService?.subscribeToIncomingMessages(handleIncomingMessage);

        return () => {
            chatService?.unsubscribeFromIncomingMessages();
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
        <View>
            <Text>Chat Screen</Text>
            <View>
                {messages.map((message, index) => (
                    <View key={index}>
                        <Text>{message.text}</Text>
                        <Text>{message.name}</Text>
                        <Text>{message.time}</Text>
                    </View>
                ))}
            </View>
            <View>
                <TextInput value={inputMessage} onChangeText={setInputMessage} />
                <Button title="Send" onPress={handleSendMessage} />
            </View>
        </View>
    );
};

export default ChatScreen;
