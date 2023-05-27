import {Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import appTheme from "../../theme";
import React, {useEffect, useState} from "react";
import {Col, Grid, Row} from "react-native-easy-grid";
import firebase from "firebase/compat";
import {claims, firebaseConfig} from '../../config';
import TimetableAlert from "./TimetableAlert";
import {decodeToken} from "../services/AuthService";

function Timetable({ItemSeparator}){
    const currentDate = new Date();
    let minDate = new Date(currentDate);
    minDate.setFullYear(currentDate.getFullYear() - 1);
    let maxDate = new Date(currentDate);
    maxDate.setFullYear(currentDate.getFullYear() + 1);
    const [timetables, setTimetables] = useState([]);
    const [selectedDate, setSelectedDate] = useState(currentDate.toISOString().slice(0,10));
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [timetable, setTimetable] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const app = firebase.initializeApp(firebaseConfig)

    const [group, setGroup] = useState('')

    const [timetableDates, setTimetableDates] = useState([]);
    const [timetableGroups, setTimetableGroups] = useState([]);
    const [timetableTeacher, setTimetableTeacher] = useState('');
    const [timetableType, setTimetableType] = useState('');
    const [timetableTime, setTimetableTime] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date.format('YYYY-MM-DD'));
        setIsCalendarVisible(false);

        const arr = [];
        firebase
            .firestore(app)
            .collection('2023first')
            .where('dates', 'array-contains', date.format('YYYY-MM-DD'))
            .get()
            .then((query) => {
                query.forEach((doc) => {
                    arr.push(doc.data())
                })
                console.log(arr[0]['time'].split(':'))
                arr.sort((a, b) => {
                    const timeA = Number(a.time.split(':')[0]);
                    const timeB = Number(b.time.split(':')[0]);
                    if (timeA < timeB) {
                        return -1;
                    } else if (timeA > timeB) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            })
            .then(() => setTimetable(arr));
        console.log(timetable)
    }

    useEffect(() => {
        decodeToken().then((data) => setGroup(data[claims.group]))
        const arr = [];
        firebase
            .firestore(app)
            .collection('2023first')
            .where('dates', 'array-contains', selectedDate)
            .where('groups', 'array-contains', group)
            .get()
            .then((query) => {
                query.forEach((doc) => {
                    arr.push(doc.data())
                })
            })
            .then(() => setTimetable(arr));
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
                onDateChange={handleDateChange}
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
            keyExtractor={(item) => item.id}
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
        borderColor: appTheme.COLORS.primary
    },

});

export default Timetable;