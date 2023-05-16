import React from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, StyleSheet, Pressable, Platform} from 'react-native';
import appTheme from "../../theme";

function AuthForm({ username, password, setUsername, setPassword, handleLogin }) {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View>
                <Text style={styles.label}>Логин</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
                <Text style={styles.label}>Пароль</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    value={password}
                />
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={[styles.label, {color: appTheme.COLORS.white}]}>ВОЙТИ</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
      width: '70%'
    },
    input: {
        backgroundColor: 'white',
        borderColor: appTheme.COLORS.primary,
        borderWidth: 1,
        height: 40,
        borderRadius: 20,
        fontSize: appTheme.SIZES.h3,
        textAlign: 'center',
        color: appTheme.COLORS.primary,
        borderBottomColor: appTheme.COLORS.primary
    },
    label: {
        color: appTheme.COLORS.primary,
        margin: 10,
        marginLeft: 0,
        textAlign: 'center',
        fontFamily: appTheme.FONTS.montserratMedium,
        fontSize: appTheme.SIZES.h3,
        fontWeight: 'bold'
    },
    button: {
        marginTop: '15%',
        textAlign: "center",
        borderRadius: 20,
        backgroundColor: appTheme.COLORS.primary
    },

});

export default AuthForm;
