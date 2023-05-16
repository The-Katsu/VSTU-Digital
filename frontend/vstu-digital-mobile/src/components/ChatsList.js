import {Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import ChatsService from "../services/ChatsService";
import appTheme from "../../theme";

function ChatsList({navigation}){
    const chatService = new ChatsService();
    const [chats, setChats] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [chatName, setChatName] = useState('');

    const handleCreateChat = async () => {
        const newChat = await chatService.createChat(chatName);
        setChats([...chats, newChat]);
        setIsModalVisible(false);
    };

    const fetchChats = async () => {
        const chats = await chatService.getChats();
        setChats(chats);
    };

    useEffect(() => {
        fetchChats().then();
    }, []);

    const navigateToChatScreen = (chatId) => {
        navigation.navigate('Chat', { chatId });
    };

    const renderChat = ({ item }) => (
        <TouchableOpacity style={styles.chatContainer} onPress={() => navigateToChatScreen(item.id)}>
            <Text style={styles.chatName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return(
        <View>
            <FlatList
                data={chats}
                renderItem={renderChat}
                keyExtractor={chat => chat.id.toString()}
            />
            <View style={styles.createChatContainer}>
                <Button title="Create Chat" onPress={() => setIsModalVisible(true)} />
            </View>
            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Chat Name"
                                onChangeText={text => setChatName(text)}
                                value={chatName}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.createButton]}
                                onPress={() => handleCreateChat()}
                            >
                                <Text style={styles.buttonText}>Создать</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Отмена</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    chatContainer: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 20,
    },
    chatName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    createChatContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000aa'
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center'
    },
    inputContainer: {
        marginVertical: 10,
        width: '100%'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '100%',
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20
    },
    createButton: {
        backgroundColor: '#2196f3',
        borderRadius: 20,
        width: '30%'
    },
    cancelButton: {
        backgroundColor: 'red',
        borderRadius: 20,
        width: '30%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: appTheme.FONTS.montserratMedium
    }
});

export default ChatsList;