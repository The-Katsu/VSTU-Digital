import {Alert, Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {deleteChat, editChat, getChat} from "../services/ChatsService";
import {useFocusEffect} from "@react-navigation/native";
import appTheme from "../../theme";
import SelectDropdown from "react-native-select-dropdown";
import {getGroups} from "../dal/firebase";

const ChatEditorModal = ({visible, onClose, chat}) => {
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [groups, setGroups] = useState([])
    const [selectedGroups, setSelectedGroups] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (visible) {
            setLoad(true)
        } else {
            setLoad(false)
        }

        if (!load) {
            setId(chat.id)
            setName(chat.name)
            setSelectedGroups(chat.groups)
            getGroups().then((data) => {
                const toRemove = chat.groups
                const tmp = data.filter(a => !toRemove.includes(a))
                setGroups(tmp)
            })
        }
    })

    const commitChanges = () => {
        try {
            pushChanges()
        } catch (e) {
            alert(e.message)
        }
    }

    const pushChanges = () => {
        if (name === '') {
            throw new Error('Название не может быть пустым')
        }
        if (selectedGroups.length === 0) {
            throw new Error('Список групп не может быть пустым')
        }
        editChat(id, name, selectedGroups)
            .then(() => {
                    console.log('edited')
                    onClose()
                }
            )
    }

    const onGroupSelect = (item, index) => {
        setSelectedGroups([...selectedGroups, item])
        const tmp = [...groups]
        tmp.splice(index, 1)
        setGroups(tmp)
    }

    const removeSelectedGroupItem = index => {
        const tmp = [...selectedGroups]
        const item = tmp[index]
        setGroups([...groups, item])
        tmp.splice(index, 1)
        setSelectedGroups(tmp)
    }

    const removeChat = () => {
        Alert.alert('Подтвердите действие', 'Вы уверены, что хотите удалить чат ?', [
            {text: 'Отмена', onPress: () => {}},
            {text: 'Подтвердить', onPress: () => {
                deleteChat(id).then(() => onClose())
                }}
        ])
    }

    return (
        <Modal
            transparent
            animationType='fade'
            visible={visible}>
            <View style={styles.container}>

                <TextInput style={styles.input}
                    onChangeText={text => setName(text)}
                    value={name}
                    />


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

                {
                    selectedGroups.map((g, index) => (
                        <View style={{flexDirection: 'row', flexWrap: 'wrap',}}>
                            <View style={styles.groupItem}>
                                <Text style={styles.groupItemText}>
                                    {g}
                                </Text>
                            </View>
                            <Button
                                onPress={() => removeSelectedGroupItem(index)}
                                color={appTheme.COLORS.white}  title={'X'}/>
                        </View>
                    ))
                }

                <TouchableOpacity
                    style={styles.save}
                    onPress={commitChanges}>
                    <Text style={styles.saveTxt}>
                        Сохранить
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.save}
                    onPress={removeChat}>
                    <Text style={styles.saveTxt}>
                        Удалить
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.close}
                    onPress={onClose}>
                    <Text style={styles.closeTxt}>
                        Закрыть
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    input : {
        backgroundColor: appTheme.COLORS.white,
        width: '80%',
        textAlign: 'center',
        height: '5%',
        fontSize: 18,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: appTheme.COLORS.primary
    },
    close: {
        backgroundColor: appTheme.COLORS.primary,
        marginTop: '3%',
        padding: 5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: appTheme.COLORS.primary,
        width: '40%',
    },
    closeTxt: {
        textAlign: 'center',
        fontSize: 18,
        color: appTheme.COLORS.white
    },
    save: {
        backgroundColor: appTheme.COLORS.secondary,
        marginTop: '3%',
        padding: 5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: appTheme.COLORS.primary,
        width: '40%',
    },
    saveTxt: {
        textAlign: 'center',
        fontSize: 18,
        color: appTheme.COLORS.primary
    },
    groupItem: {
        backgroundColor: appTheme.COLORS.white,
        borderColor: appTheme.COLORS.primary,
        borderWidth: 2,
        borderRadius: 20,
        width: '20%',
        margin: 3
    },
    groupItemText: {
        textAlign: 'center',
        padding: 3
    },
    dropdownText: {
        color: appTheme.COLORS.primary,
        fontFamily: appTheme.FONTS.montserratMedium,
        fontSize: 16
    },
    dropdown: {
        borderRadius: 20,
        backgroundColor: appTheme.COLORS.white,
        margin: 10
    },
    dropdownBtn: {
        width: '80%',
        height: 40
    },
})

export default ChatEditorModal;