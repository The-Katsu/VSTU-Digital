import {Button, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import appTheme from "../../theme";
import React, {useEffect, useState} from "react";
import {Col, Grid, Row} from "react-native-easy-grid";

function Timetable({ItemSeparator}){
    const currentDate = new Date();
    let minDate = new Date(currentDate);
    minDate.setFullYear(currentDate.getFullYear() - 1);
    let maxDate = new Date(currentDate);
    maxDate.setFullYear(currentDate.getFullYear() + 1);
    const [timetables, setTimetables] = useState([]);
    const [selectedDate, setSelectedDate] = useState(currentDate.toISOString().slice(0,10));
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date.format('YYYY-MM-DD'));
        setIsCalendarVisible(false);
    }

    useEffect(() => {
        setTimetables([
            { id: 1, time: '8:30-11:40', text: 'Информация', teacher: "Преподаватель", room: "кабинет" },
            { id: 2, time: '11:50-13:20', text: 'Информация', teacher: "Преподаватель", room: "кабинет" },
            { id: 3, time: '13:20-15:10', text: 'Информация', teacher: "Преподаватель", room: "кабинет" }
        ]);
    }, [])


    const renderTimetable = ({item}) => (
        <TouchableOpacity>
            <Grid>
                <Col size={1}>
                    <Text style={{marginTop: '15%', marginLeft: '20%'}}>{item.time}</Text>
                </Col>
                <Col size={2}>
                    <Row>
                        <Text>{item.text}</Text>
                    </Row>
                    <Row>
                        <Text>{item.teacher}</Text>
                    </Row>
                    <Row>
                        <Text>{item.room}</Text>
                    </Row>
                </Col>
            </Grid>
        </TouchableOpacity>
    );


    return(<View>
        <Text style={styles.label}>Выбранная дата: {selectedDate}</Text>
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
            data={timetables}
            renderItem={renderTimetable}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={ItemSeparator}
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
});

export default Timetable;