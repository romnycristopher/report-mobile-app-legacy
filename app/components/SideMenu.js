//
// ────────────────────────────────────────────────────── I ──────────
//   :::::: I M P O R T S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//

//
// ─── LIBRARIES ──────────────────────────────────────────────────────────────────
//
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { appLanguageAct, logOutUserAct } from '../actions';
import * as translation from '../config/lang.json';

//
// ─── ASSETS ─────────────────────────────────────────────────────────────────────
//
const aicologo = require('../assets/images/aicodigital_logo.png');
const homeIcon = require('../assets/images/menuIcon_home.png');
const profileIcon = require('../assets/images/menuIcon_profile.png');
const reportIcon = require('../assets/images/menuIcon_reports.png');
const subscriptionIcon = require('../assets/images/menuIcon_subscription.png');
const languageIcon = require('../assets/images/menuIcon_language.png');
const logoutIcon = require('../assets/images/menuIcon_logout.png');
const closeBtn = require('../assets/images/close-btn.png');

//
// ────────────────────────────────────────────────────────── II ──────────
//   :::::: C O M P O N E N T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
//
class SideMenu extends Component {
    constructor(props) {
        super(props);

        this.onChangeLanguague = this.onChangeLanguague.bind(this);
    }

    onChangeLanguague() {
        this.props.appLanguageAct();
    }

    render() {
        const { navigation, appLanguage, signUpName } = this.props;
        const txt = translation[appLanguage];

        return (
            <SafeAreaView style={style.safearea}>
                <TouchableWithoutFeedback onPress={() => navigation.closeDrawer()}>
                    <Image source={closeBtn} style={style.closeBtn} />
                </TouchableWithoutFeedback>
                <ScrollView>
                    <View>
                        <View style={style.userDataWrap}>
                            <Text style={style.userName}>{signUpName}</Text>
                            <Text style={style.userPlan}>{txt.sidemenu.greeting}</Text>
                        </View>
                        <View>
                            <View style={style.menuItem}>
                                <Image source={homeIcon} style={style.homeIcon} />
                                <Text
                                    style={style.menuItemText}
                                    onPress={() => navigation.navigate('Dashboard')}
                                >
                                    {txt.sidemenu.home}
                                </Text>
                            </View>
                            <View style={style.menuItem}>
                                <Image source={profileIcon} style={style.profileIcon} />
                                <Text
                                    style={style.menuItemText}
                                    onPress={() => navigation.navigate('UserProfile')}
                                >
                                    {txt.sidemenu.profile}
                                </Text>
                            </View>
                            <View style={style.menuItem}>
                                <Image source={reportIcon} style={style.reportIcon} />
                                <Text
                                    style={style.menuItemText}
                                    onPress={() => navigation.navigate('ReportStack')}
                                >
                                    {txt.sidemenu.reports}
                                </Text>
                            </View>
                            <View style={style.menuItem}>
                                <Image source={subscriptionIcon} style={style.subscriptionIcon} />
                                <Text
                                    style={style.menuItemText}
                                    onPress={() => navigation.navigate('SubscriptionStack')}
                                >
                                    {txt.sidemenu.subscription}
                                </Text>
                            </View>
                            <View style={style.menuItem}>
                                <Image source={languageIcon} style={style.languageIcon} />
                                <Text style={style.menuItemText} onPress={this.onChangeLanguague}>
                                    {txt.sidemenu.changelanguage}
                                </Text>
                            </View>
                            <View style={style.menuItemLast}>
                                <Image source={logoutIcon} style={style.logoutIcon} />
                                <Text
                                    style={style.menuItemText}
                                    onPress={() => this.props.logOutUserAct()}
                                >
                                    {txt.sidemenu.logout}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={style.logoWrap}>
                    <Image source={aicologo} style={style.aicologo} />
                    <Text style={style.logoFooter}>support@aico.com.do</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        appLanguage: state.generalReducer.appLanguage,
        signUpName: state.signUpReducer.signUpName
    };
};

export default connect(
    mapStateToProps,
    {
        appLanguageAct,
        logOutUserAct
    }
)(SideMenu);

const style = StyleSheet.create({
    safearea: {
        paddingRight: 15,
        paddingLeft: 15,
        flex: 1
        // backgroundColor: '#000'
    },
    closeBtn: {
        width: 18,
        height: 18,
        marginBottom: 30,
        marginTop: 10
    },
    userDataWrap: {
        marginBottom: 30
    },
    userName: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 24,
        fontWeight: '100'
    },
    userPlan: {
        fontSize: 13,
        color: '#959492'
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#F3F3F4',
        borderBottomWidth: 1,
        paddingTop: 15,
        paddingBottom: 15
    },
    menuItemLast: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    menuItemText: {
        color: '#1D1D26',
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
    },
    homeIcon: {
        width: 25,
        height: 22,
        marginRight: 20
    },
    profileIcon: {
        width: 20,
        height: 19,
        marginRight: 20
    },
    reportIcon: {
        width: 22,
        height: 22,
        marginRight: 20
    },
    subscriptionIcon: {
        width: 20,
        height: 24,
        marginRight: 20
    },
    languageIcon: {
        width: 22,
        height: 23,
        marginRight: 20
    },
    logoutIcon: {
        width: 20,
        height: 21,
        marginRight: 20
    },
    logoWrap: {
        alignItems: 'center',
        marginBottom: 15
    },
    aicologo: {
        width: 108,
        height: 57,
        marginBottom: 5
    },
    logoFooter: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        color: '#8E8E92'
    }
});
