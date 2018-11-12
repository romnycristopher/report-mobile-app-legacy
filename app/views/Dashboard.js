//
// ──────────────────────────────────────────────────── I ──────────
//   :::::: I M P O R T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

//
// ─── LIBRARIES ──────────────────────────────────────────────────────────────────
//
import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

// import { getProblemsListAct, getHouseAreasAct, getUserReportsAct } from '../actions/';

import * as translation from '../config/lang.json';

//
// ─── ASSETS ─────────────────────────────────────────────────────────────────────
//
const bgImage = require('../assets/images/dashboard_bg.png');
const logoRed = require('../assets/images/logo-red.png');
const reportBtnIconWifi = require('../assets/images/reportBtnWifi.png');
const reportBtnIconAudio = require('../assets/images/reportBtnAudio.png');
const reportBtnIconSecurity = require('../assets/images/reportBtnSecurity.png');
const reportBtnArrow = require('../assets/images/reportBtnArrow.png');
const menuIcon = require('../assets/images/menu_icon.png');

//
// ────────────────────────────────────────────────────────── II ──────────
//   :::::: C O M P O N E N T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
//

class Dashboard extends Component {
    static navigationOptions = () => {
        return {
            title: 'Home'
        };
    };

    constructor(props) {
        super(props);
        const { width, height } = Dimensions.get('window');

        console.ignoredYellowBox = ['Setting a timer'];

        this.state = {
            width,
            height
        };
    }

    render() {
        const { appLanguage, navigation, reportsCount } = this.props;
        const txt = translation[appLanguage];

        return (
            <SafeAreaView style={style.safeArea}>
                <Image source={bgImage} style={style.backgroundImage} />
                <View style={style.header}>
                    <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                        <Image source={menuIcon} style={style.menuIcon} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ReportStack')}>
                        <View style={style.reportsCountWrap}>
                            <Text style={style.reportsCountText}>
                                {txt.dashboard.reportsCountText}
                            </Text>
                            <View style={style.reportsCountNumWrap}>
                                <Text style={style.reportsCountNum}>{reportsCount}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={style.sectionInfo}>
                    <Image source={logoRed} style={style.logoRed} />
                    <View style={style.sectionTitleWrap}>
                        <Text style={style.title}>{txt.dashboard.title}</Text>
                        <Text style={style.subtitle}>{txt.dashboard.subtitle}</Text>
                    </View>
                </View>
                <View>
                    <View style={style.reportBtnsWrap}>
                        <TouchableHighlight
                            onPress={() => {
                                navigation.navigate('ReportCreate', {
                                    problemType: 'wifi_internet',
                                    title: txt.reportCreate.title
                                });
                            }}
                        >
                            <View style={style.reportBtn}>
                                <View style={style.reportBtnInfo}>
                                    <Image source={reportBtnIconWifi} style={style.reportBtnIcon} />
                                    <View>
                                        <Text style={style.reportBtnTitle}>
                                            {txt.dashboard.reportBtnInternetTitle}
                                        </Text>
                                        <Text style={style.reportBtnSubTitle}>
                                            {txt.dashboard.reportBtnInternetSubTitle}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Image source={reportBtnArrow} style={style.reportBtnArrow} />
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() =>
                                navigation.navigate('ReportCreate', {
                                    problemType: 'audio_video',
                                    title: txt.reportCreate.title
                                })
                            }
                        >
                            <View style={style.reportBtn}>
                                <View style={style.reportBtnInfo}>
                                    <Image
                                        source={reportBtnIconAudio}
                                        style={style.reportBtnIcon}
                                    />
                                    <View>
                                        <Text style={style.reportBtnTitle}>
                                            {txt.dashboard.reportBtnAudioTitle}
                                        </Text>
                                        <Text style={style.reportBtnSubTitle}>
                                            {txt.dashboard.reportBtnAudioSubTitle}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Image source={reportBtnArrow} style={style.reportBtnArrow} />
                                </View>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress={() =>
                                navigation.navigate('ReportCreate', {
                                    problemType: 'security',
                                    title: txt.reportCreate.title
                                })
                            }
                        >
                            <View style={style.reportBtnLast}>
                                <View style={style.reportBtnInfo}>
                                    <Image
                                        source={reportBtnIconSecurity}
                                        style={style.reportBtnIcon}
                                    />
                                    <View>
                                        <Text style={style.reportBtnTitle}>
                                            {txt.dashboard.reportBtnSecurityTitle}
                                        </Text>
                                        <Text style={style.reportBtnSubTitle}>
                                            {txt.dashboard.reportBtnSecuritySubTitle}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Image source={reportBtnArrow} style={style.reportBtnArrow} />
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        appLanguage: state.generalReducer.appLanguage,
        reportsCount: state.signUpReducer.reportsCount
    };
};

export default connect(mapStateToProps)(Dashboard);

const style = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5
    },
    menuIcon: {
        width: 20,
        height: 17,
        marginLeft: 15
    },
    reportsCountWrap: {
        width: 95,
        height: 29,
        backgroundColor: '#2C2A25',
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 5,
        paddingLeft: 10,
        borderRadius: 25,
        alignItems: 'center'
    },
    reportsCountText: {
        color: '#fff',
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
    },
    reportsCountNumWrap: {
        backgroundColor: '#F4313F',
        borderRadius: 25,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    reportsCountNum: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        color: '#fff',
        fontSize: 10
    },
    backgroundImage: {
        position: 'absolute',
        resizeMode: 'cover',
        flex: 1
    },
    sectionInfo: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    sectionTitleWrap: {
        alignItems: 'center',
        marginTop: 30
    },
    title: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 30,
        fontWeight: '100',
        textAlign: 'center',
        marginBottom: 10,
        width: 300
    },
    subtitle: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 13,
        color: '#959492',
        textAlign: 'center',
        width: 300
    },
    logoRed: {
        width: 113,
        height: 116
    },
    reportProblemlabel: {
        backgroundColor: '#E4E4E4',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingBottom: 5,
        paddingTop: 5
    },
    reportProblemlabelTxt: {
        fontWeight: '900',
        fontSize: 17,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
    },
    reportBtnsWrap: {
        ...ifIphoneX({
            backgroundColor: '#F4313F',
            marginBottom: -40,
            paddingBottom: 30
        })
    },
    reportBtn: {
        backgroundColor: '#F4313F',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderBottomColor: '#EA2F3E',
        borderBottomWidth: 1
    },
    reportBtnLast: {
        backgroundColor: '#F4313F',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        paddingRight: 15,
        paddingLeft: 15,
        borderBottomColor: '#EA2F3E'
    },
    reportBtnInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    reportBtnTitle: {
        color: '#fff',
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 17,
        fontWeight: '800',
        marginBottom: -5
    },
    reportBtnSubTitle: {
        color: '#fff',
        opacity: 0.75,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
    },
    reportBtnIcon: {
        height: 29,
        width: 29,
        marginRight: 7
    },
    reportBtnArrow: {
        width: 12,
        height: 20
    }
});
