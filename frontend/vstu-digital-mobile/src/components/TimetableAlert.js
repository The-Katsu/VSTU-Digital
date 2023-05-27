import React from 'react';
import { View, Button, Text, StyleSheet, Modal } from 'react-native';
import appTheme from "../../theme";

const TimetableAlert = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Custom Title</Text>
                <Text style={styles.modalMessage}>Custom Message</Text>

                <Button title="Закрыть" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appTheme.COLORS.white,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default TimetableAlert;
