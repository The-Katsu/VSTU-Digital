import React from 'react';
import {View, Button, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import appTheme from "../../theme";

const TimetableAlert = ({ item, visible, onClose }) => {

    console.log(item)

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>

                <View style={styles.info}>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <Text style={styles.cellHeader}>Преподаватель:</Text>
                            <Text style={styles.cell}>{item.teacher}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellHeader}>Занятие:</Text>
                            <Text style={styles.cell}>{item.type}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellHeader}>Кабинет:</Text>
                            <Text style={styles.cell}>{item.room}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellHeader}>Время:</Text>
                            <Text style={styles.cell}>{item.time}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellHeader}>Группы:</Text>
                            {
                                item.groups === undefined ?
                                    null :
                                    <Text style={styles.cell}>{item.groups.join('\n')}</Text>
                            }
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellHeader}>Даты:</Text>
                            {
                                item.dates === undefined ?
                                    null :
                                    <Text style={styles.cell}>{item.dates.join('\n')}</Text>
                            }
                        </View>
                    </View>

                    <TouchableOpacity style={{borderColor: appTheme.COLORS.white, borderWidth: 2, backgroundColor: appTheme.COLORS.primary, borderRadius: 20, marginTop: '10%'}} onPress={onClose}>
                        <Text style={[{color: appTheme.COLORS.white, fontSize: 24, padding: 7, textAlign: 'center'}]}>Закрыть</Text>
                    </TouchableOpacity>
                </View>

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
    HeadStyle: {
        height: 50,
        alignContent: "center",
        backgroundColor: '#ffe0f0'
    },
    TableText: {
        margin: 10
    },
    row: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    cellHeader: {
        fontWeight: 'bold',
        marginRight: 10,
        color: appTheme.COLORS.white,
        fontSize: 20
    },
    cell: {
        marginRight: 10,
        color: appTheme.COLORS.white,
        fontSize: 20,
        textAlign: 'center'
    },
    info: {
        backgroundColor: appTheme.COLORS.primary,
        padding: 20,
        borderRadius: 30
    }
});

export default TimetableAlert;
