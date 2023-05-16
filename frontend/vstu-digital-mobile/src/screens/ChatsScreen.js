import React, { useState } from 'react';
import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import Toggle  from "react-native-toggle-element";
import appTheme from "../../theme";
import ChatsList from "../components/ChatsList";
import Timetable from "../components/Timetable";

const ChatsScreen = ({ navigation }) => {

    const [toggleValue, setToggleValue] = useState(false);
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

    return (
        <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    onPress={ToUserPage}
                    style={styles.item}>
                    <Image

                        source={require('../../assets/user.png')} />
                </TouchableOpacity>
                <View style={{marginLeft: '25%'}}>
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

                {
                    toggleValue === false ?
                        <ChatsList
                            navigation={navigation}
                        />
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
    item: {
        marginLeft: '85%' // is 50% of container width
    },
    label: {
        marginLeft: '50%'
    }
});


export default ChatsScreen;
