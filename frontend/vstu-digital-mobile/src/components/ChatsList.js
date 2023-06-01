import {FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {createChat, getChats} from "../services/ChatsService";
import appTheme from "../../theme";
import {getGroups} from "../dal/firebase";
import SelectDropdown from 'react-native-select-dropdown'
import {decodeToken} from "../services/AuthService";
import {claims} from "../../config";

function ChatsList({navigation}){
    const [chats, setChats] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [chatName, setChatName] = useState('');
    const [groups, setGroups] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [decodedToken, setDecodedToken] = useState({})


    useEffect(() => {

        fetchChats().then();
        decodeToken().then((data) => {
            setDecodedToken(data)
        });
    }, []);

    const handleCreateChat = () => {
        createChat(chatName, selectedGroups)
            .then((data) => {
                console.log(data)
                setChats([...chats, data]);
                setIsModalVisible(false);
            })
            .catch((e) => {
                console.log(e.message);
                setIsModalVisible(false);
            });
    };

    const openModal = async () => {
        const groups = await getGroups();
        setGroups(groups);
        setIsModalVisible(true);
    }

    const fetchChats = async () => {
        const chats = await getChats();
        console.log(chats)
        setChats(chats);
        setSelectedGroups([])
    };

    const cancelModal = async () => {
        setIsModalVisible(false);
        setSelectedGroups([]);
        setChatName('');
    }



    const navigateToChatScreen = (chatId) => {
        navigation.navigate('Chat', { chatId });
    };

    const renderChat = ({ item }) => (
        <TouchableOpacity style={styles.chatContainer} onPress={() => navigateToChatScreen(item.id)}>
            <View>
                <Text style={styles.chatName}>{item.name} {'\t'} {
                    item.newMessagesCount === 0 ?
                        null
                        :
                        <View style={{backgroundColor: appTheme.COLORS.primary, borderRadius: 20}}>
                            <Text style={{
                                color: appTheme.COLORS.white,
                                fontSize: 16
                            }}>
                                {' '}{item.newMessagesCount}{' '}
                            </Text>
                        </View>

                }</Text>
            </View>

            <Text style={styles.chatCreatorName}>{item.creator}</Text>
        </TouchableOpacity>
    );

    const removeSelectedItem = (item) => {
        setGroups([...groups, item]);
        const temp = [...selectedGroups];
        const idx = temp.indexOf(item);
        temp.splice(idx, 1);
        setSelectedGroups(temp);
    }

    const onGroupSelect = (selectedItem, index) => {
        setSelectedGroups([...selectedGroups, selectedItem])
        const temp = [...groups];
        temp.splice(index, 1);
        setGroups(temp);
    }

    const renderSelectedGroups = ({item}) => (
        <View style={styles.row}>
            <Text style={styles.selectedGroupText}>{item}</Text>
            <TouchableOpacity style={styles.removeSelectedGroupBtn}>
                <Text
                    onPress={() => removeSelectedItem(item)}
                    style={styles.removeSelectedGroupBtnText}>X</Text>
            </TouchableOpacity>
        </View>
    )

    return(
        <View>
            <Text>{'\n'}</Text>
            <FlatList
                style={{height: '85%'}}
                data={chats}
                renderItem={renderChat}
                keyExtractor={chat => chat.id.toString()}
            />
            {
                decodedToken[claims.role] === 'Преподаватель' ?
                <TouchableOpacity
                    onPress={() => openModal()}
                    style={styles.createChatContainer}>
                    <Text style={styles.createChatBtnText}>Создать чат</Text>
                </TouchableOpacity>
                    :
                    null
            }

            <Modal visible={isModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Название чата"
                                placeholderTextColor={appTheme.COLORS.secondary}
                                onChangeText={text => setChatName(text)}
                                value={chatName}
                            />
                        </View>
                        <SelectDropdown
                            buttonStyle={[styles.dropdown, styles.dropdownBtn]}
                            dropdownStyle={styles.dropdown}
                            rowTextStyle={styles.dropdownText}
                            buttonTextStyle={styles.dropdownText}
                            defaultButtonText={'Выберите группу(ы)'}
                            data={groups}
                            onSelect={onGroupSelect}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return 'Выберите группу(ы)'
                            }}
                        />
                        <Text style={styles.lstText}>
                            Список групп:
                        </Text>
                        <FlatList
                            data={selectedGroups}
                            renderItem={renderSelectedGroups} />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.createButton]}
                                onPress={() => handleCreateChat()}
                            >
                                <Text style={styles.buttonText}>Создать</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => cancelModal()}
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
    selectedGroupText: {
        fontFamily: appTheme.FONTS.montserratMedium,
        fontSize: 16,
        marginTop: 2
    },
    removeSelectedGroupBtn: {

    },
    chatCreatorName: {
        fontFamily: appTheme.FONTS.montserratMedium,
        color: appTheme.COLORS.primary,
        fontSize: 14,
        textAlign: 'center'
    },
    removeSelectedGroupBtnText: {
        fontFamily: appTheme.FONTS.montserratMedium,
        color: appTheme.COLORS.primary,
        fontSize: 20,
        textAlign: 'right'
    },
    row: {
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: appTheme.COLORS.secondary,
        borderBottomWidth: 2,
        backgroundColor: appTheme.COLORS.white
    },
    chatContainer: {
        borderBottomWidth: 1,
        borderColor: appTheme.COLORS.primary,
        padding: 10,
        borderWidth: 2,
        borderRadius: 20,
        margin: 2,
        marginTop: 8,
        width: '90%',
        marginLeft: '5%'
    },
    input: {
        borderColor: appTheme.COLORS.secondary,
        borderWidth: 2,
        borderRadius: 20,
        textAlign: 'center',
        fontFamily: appTheme.FONTS.montserratMedium,
        color: appTheme.COLORS.secondary,
        height: 40,
        fontSize: 18,
    },
    dropdownText: {
        color: appTheme.COLORS.white,
        fontFamily: appTheme.FONTS.montserratMedium,
        fontSize: 16
    },
    dropdown: {
        borderRadius: 20,
        backgroundColor: appTheme.COLORS.secondary
    },
    dropdownBtn: {
        width: '100%',
        height: 40
    },
    chatName: {
        fontSize: 20,
        fontFamily: appTheme.FONTS.montserratMedium,
        textAlign: 'center',
        color: appTheme.COLORS.primary
    },
    createChatContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    createChatBtnText: {
        fontSize: 20,
        borderRadius: 5,
        borderWidth: 2,
        marginTop: 10,
        marginRight: 10,
        color: appTheme.COLORS.primary,
        borderColor: appTheme.COLORS.primary,
        fontFamily: appTheme.FONTS.montserratMedium
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    createButton: {
        backgroundColor: appTheme.COLORS.secondary,
        borderRadius: 20,
        width: '30%',
    },
    cancelButton: {
        backgroundColor: appTheme.COLORS.primary,
        borderRadius: 20,
        width: '30%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: appTheme.FONTS.montserratMedium
    },
    lstText: {
        fontFamily: appTheme.FONTS.montserratMedium,
        color: appTheme.COLORS.secondary
    }
});

export default ChatsList;