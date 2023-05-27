import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import appTheme from "../../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfileScreen = ({navigation}) => {

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Auth');
    }

    return (
        <View style={styles.container}>
            <View style={styles.userForm}>
                <Text style={styles.userInfoLabel}>Логин</Text>
                <TextInput style={styles.userInfo} editable={false}>{'vladimir'}</TextInput>
                <Text style={styles.userInfoLabel}>Фамилия</Text>
                <TextInput style={styles.userInfo} editable={false}>{'Авилов'}</TextInput>
                <Text style={styles.userInfoLabel}>Имя</Text>
                <TextInput style={styles.userInfo} editable={false}>{'Владимир'}</TextInput>

                <Text style={styles.userInfoLabel}>Отчество</Text>
                <TextInput style={styles.userInfo} editable={false}>{'Сергеевич'}</TextInput>
                <Text style={styles.userInfoLabel}>Группа</Text>
                <TextInput style={styles.userInfo} editable={false}>{'ППЦ-3'}</TextInput>
            </View>


            <TouchableOpacity style={styles.logoutBtn} onPress={() => handleLogout()}>
                <Text style={styles.logoutBtnText}>
                    Выход
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: appTheme.COLORS.white,
        width: '100%',
        height: '100%'
    },
    userForm: {
        marginTop: '20%'
    },
    userInfoLabel: {
        fontFamily: appTheme.FONTS.montserratMedium,
        textAlign: 'center',
        fontSize: 24,
        color: appTheme.COLORS.primary
    },
    userInfo: {
        fontFamily: appTheme.FONTS.montserratMedium,
        marginLeft: '15%',
        textAlign: 'center',
        fontSize: 24,
        borderWidth: 2,
        borderRadius: 20,
        width: '70%',
        margin: 5,
        borderColor: appTheme.COLORS.primary,
        color: appTheme.COLORS.primary
    },
    logoutBtn: {
        borderWidth: 2,
        borderColor: appTheme.COLORS.primary,
        width: '30%',
        borderRadius: 20,
        marginLeft: '35%',
        marginTop: '10%',
        backgroundColor: appTheme.COLORS.primary
    },
    logoutBtnText: {
        textAlign: 'center',
        color: appTheme.COLORS.white,
        fontSize: 30
    }
});

export default UserProfileScreen;
