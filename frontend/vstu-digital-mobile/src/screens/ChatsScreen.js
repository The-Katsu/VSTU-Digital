import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Button} from 'react-native';
import Toggle  from "react-native-toggle-element";
import appTheme from "../../theme";
import ChatsList from "../components/ChatsList";
import Timetable from "../components/Timetable";
import {useIsFocused} from "@react-navigation/native";

const ChatsScreen = ({ navigation }) => {

    const [toggleValue, setToggleValue] = useState(false);

    const isFocused = useIsFocused();


    const colorStyles = (value) => value ?
        {color: appTheme.COLORS.white}
        :
        {color: appTheme.COLORS.primary}

    const ItemSeparator = () => (
        <View
            style={{
                height: 2,
                width: '100%',
                marginTop: 10,
                backgroundColor: appTheme.COLORS.primary,
            }}
        />
    );

    const ToUserPage = () => {
      navigation.navigate('Profile');
    };


    if (!isFocused) return ;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.row}>
                <View style={styles.toggle}>
                    <Toggle
                        value={toggleValue} onPress={(val) => setToggleValue(val)}
                        leftComponent={<Text style={colorStyles(!toggleValue)}>Чат</Text>}
                        rightComponent={<Text style={colorStyles(toggleValue)}>Расписание</Text>}
                        trackBar={{
                            width: 200,
                            height: 40,
                            radius: 60,
                            activeBackgroundColor: appTheme.COLORS.white,
                            inActiveBackgroundColor: appTheme.COLORS.white
                        }}
                        thumbButton={{
                            width: 100,
                            height: 40,
                            radius: 30,
                            activeColor: appTheme.COLORS.white,
                            inActiveColor: appTheme.COLORS.primary,
                            activeBackgroundColor: appTheme.COLORS.primary,
                            inActiveBackgroundColor: appTheme.COLORS.primary
                        }}
                    />
                </View>

                <TouchableOpacity
                    onPress={ToUserPage}
                    style={styles.profile}>
                    <Image
                        style={styles.icon}
                        source={require('../../assets/user.png')} />
                </TouchableOpacity>
            </View>

            {
                toggleValue === false ?
                    <ChatsList navigation={navigation} />
                    :
                    <Timetable
                        ItemSeparator={ItemSeparator}
                    />
            }

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    label: {
        marginLeft: '50%'
    },
    toggle: {
        marginLeft: '25%'
    },
    profile: {
        marginLeft: '10%',
        marginTop: '2%'
    },
    icon: {

    },
    row: {
        marginTop: '3%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});


export default ChatsScreen;
