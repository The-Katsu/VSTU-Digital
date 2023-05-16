import React from 'react';
import { View, Text } from 'react-native';
import {User} from '../../config';

const UserProfileScreen = () => {
    return (
        <View>
            <Text>Логин: {User.username}</Text>
            <Text>Имя: {User.firstName}</Text>
            <Text>Фамилия: {User.lastName}</Text>
            <Text>Отчество: {User.patronymic}</Text>
            <Text>Группа: {User.group}</Text>
        </View>
    );
};

export default UserProfileScreen;
