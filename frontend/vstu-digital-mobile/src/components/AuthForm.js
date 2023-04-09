import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function AuthForm({ username, password, setUsername, setPassword, handleLogin }) {
    return (
        <View>
            <Text>Username:</Text>
            <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <Text>Password:</Text>
            <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

export default AuthForm;
