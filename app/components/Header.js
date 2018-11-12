//
// ──────────────────────────────────────────────────── I ──────────
//   :::::: I M P O R T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//
import React from 'react';
import { Image, View, Text, TouchableWithoutFeedback, StyleSheet, Platform } from 'react-native';

const backImage = require('../assets/images/back.png');
const closeImage = require('../assets/images/close-btn.png');
const plusIcon = require('../assets/images/plusIcon.png');
const menuIcon = require('../assets/images/menu_icon.png');

//
// ────────────────────────────────────────────────────────── II ──────────
//   :::::: C O M P O N E N T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
//
export const Header = ({ title, route, leftIcon, navigation, rightRoute }) => {
    // console.log(this.props);

    const renderleftIcon = () => {
        if (leftIcon === 'close') {
            return (
                <View style={style.leftBtnWrap}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate(route)}>
                        <Image source={closeImage} style={style.backImage} />
                    </TouchableWithoutFeedback>
                </View>
            );
        } else if (leftIcon === 'back') {
            return (
                <View style={style.leftBtnWrap}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <Image source={backImage} style={style.backImage} />
                    </TouchableWithoutFeedback>
                </View>
            );
        }

        return (
            <View style={style.leftBtnWrap}>
                <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                    <Image source={menuIcon} style={style.menuIcon} />
                </TouchableWithoutFeedback>
            </View>
        );
    };

    const renderRightIcon = () => {
        if (rightRoute) {
            return (
                <View style={style.rightBtnWrap}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate(rightRoute)}>
                        <Image source={plusIcon} style={style.backImage} />
                    </TouchableWithoutFeedback>
                </View>
            );
        }
    };

    return (
        <View style={style.headerWrap}>
            {renderleftIcon()}
            <View>
                <Text style={style.title}>{title}</Text>
            </View>
            {renderRightIcon()}
        </View>
    );
};

const style = StyleSheet.create({
    headerWrap: {
        height: 38,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftBtnWrap: {
        position: 'absolute',
        left: 15,
        top: 9
    },
    rightBtnWrap: {
        position: 'absolute',
        right: 15,
        top: 9
    },
    backImage: {
        width: 21,
        height: 21
    },
    menuIcon: {
        width: 20,
        height: 17
    },
    title: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 17,
        fontWeight: '200'
        // alignSelf: 'center'
    }
});
