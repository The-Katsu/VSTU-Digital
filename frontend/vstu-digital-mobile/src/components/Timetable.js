import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import appTheme from "../../theme";
import React, {useEffect, useState} from "react";
import {Col, Grid, Row} from "react-native-easy-grid";
import firebase from "firebase/compat";
import {claims, firebaseConfig} from '../../config';
import TimetableAlert from "./TimetableAlert";
import {decodeToken} from "../services/AuthService";
import {getStudentTimetable, getTeacherTimetable} from "../services/TimetableService";

function Timetable(){
    const currentDate = new Date();
    let minDate = new Date(currentDate);
    minDate.setFullYear(currentDate.getFullYear() - 1);
    let maxDate = new Date(currentDate);
    maxDate.setFullYear(currentDate.getFullYear() + 1);
    const [selectedDate, setSelectedDate] = useState(currentDate.toISOString().slice(0,10));
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [timetable, setTimetable] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const app = firebase.initializeApp(firebaseConfig)

    const [group, setGroup] = useState('')
    const [name, setName] = useState('')

    const handleDateChange = (date) => {
        setSelectedDate(date.format('YYYY-MM-DD'));
        setIsCalendarVisible(false);

        group === 'none' ?
            getTeacherTimetable(date.format('YYYY-MM-DD'), name).then((r) => setTimetable(r)) :
            getStudentTimetable(date.format('YYYY-MM-DD'), group).then((r) => setTimetable(r))
    }

    useEffect(() => {
        decodeToken().then((data) => {
            setGroup(data[claims.group])
            setName(data['FIO'])

            data[claims.group] === 'none' ?
                getTeacherTimetable(selectedDate, data['FIO']).then((r) => setTimetable(r)) :
                getStudentTimetable(selectedDate, data[claims.group]).then((r) => setTimetable(r))

        })
    }, [])


    const renderTimetable = ({item}) => (
        <TouchableOpacity style={styles.timetableBtn} onPress={() => setShowModal(true)}>
            <Grid>
                <Col size={1}>
                    <Text style={[styles.timetableItem, {marginTop: '15%', marginLeft: '20%'}]}>{item.time}</Text>
                </Col>
                <Col size={2}>
                    <Row>
                        <Text style={styles.timetableItem}>{item.type}</Text>
                    </Row>
                    <Row>
                        <Text style={styles.timetableItem}>{item.teacher}</Text>
                    </Row>
                    <Row>
                        <Text style={styles.timetableItem}>{item.room}</Text>
                    </Row>
                </Col>
            </Grid>
        </TouchableOpacity>
    );


    return(<View>
        <Text style={styles.label}>Выбранная дата: {selectedDate}</Text>
        <TimetableAlert visible={showModal} onClose={() => setShowModal(false)}/>
        {isCalendarVisible && (
            <CalendarPicker
                onDateChange={(date) => handleDateChange(date)}
                minDate={minDate}
                maxDate={maxDate}
                weekdays={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
                months={[
                    'Январь',
                    'Февраль',
                    'Март',
                    'Апрель',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентябрь',
                    'Октябрь',
                    'Ноябрь',
                    'Декабрь',
                ]}
                previousTitle="Предыдущий"
                nextTitle="Следующий"
                selectedDayColor="#2ecc71"
                selectedDayTextColor="#fff"
                todayBackgroundColor="#e6e6e6"
                todayTextStyle={{ fontWeight: 'bold' }}
                textStyle={{ color: '#000' }}
            />
        )}
        <View style={styles.calendarBtn}>
            <Button
                color={appTheme.COLORS.white}
                title={isCalendarVisible ? 'Скрыть календарь' : 'Показать календарь'}
                onPress={() => setIsCalendarVisible((prevState) => !prevState)}
            />
        </View>
        <FlatList
            data={timetable}
            renderItem={renderTimetable}
            keyExtractor={item => item.id}
        />
    </View>);
}

const styles = StyleSheet.create({
    label:{
      fontFamily: appTheme.FONTS.montserratMedium,
        textAlign: 'center',
        marginTop: '5%',
        color: appTheme.COLORS.primary,
        fontSize: 16
    },
    calendarBtn: {
        backgroundColor: appTheme.COLORS.primary,
        width: '60%',
        marginLeft: '20%',
        borderRadius: 50,
        margin: 5
    },
    timetableItem: {
        color: appTheme.COLORS.primary,
        margin: 2
    },
    timetableBtn: {
        borderWidth: 2,
        borderRadius: 20,
        margin: 5,
        borderColor: appTheme.COLORS.primary,
        width: '90%',
        marginLeft: '5%'
    },

});

export default Timetable;