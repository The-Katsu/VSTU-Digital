import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import appTheme from "../../theme";

const ErrorAlert = ({visible, onClose, label, error}) => {
    return (
      <Modal visible={visible} animationType="slide" transparent>
          <View style={styles.container}>
              <View style={styles.block}>
                  <TextInput style={styles.label} editable={false}>{label}</TextInput>
                  <Text style={styles.label}>~~~</Text>
                  <Text style={styles.label}>{error}</Text>
                  <TouchableOpacity style={styles.btn} onPress={onClose}>
                      <Text style={[styles.label, styles.btnText]}>OK</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    block: {
        width: '80%',
        height: '40%',
        backgroundColor: appTheme.COLORS.primary,
        borderRadius: 20
    },
    label: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: appTheme.FONTS.montserratMedium,
        color: appTheme.COLORS.white,
        margin: 10
    },
    btn: {
        backgroundColor: appTheme.COLORS.white,
        width: '20%',
        marginLeft: '40%',
        marginTop: '40%',
        borderRadius: 20
    },
    btnText: {
        color: appTheme.COLORS.primary,
    }
});

export default ErrorAlert;