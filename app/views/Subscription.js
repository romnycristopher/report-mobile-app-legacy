import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import * as translation from '../config/lang.json';
import HeaderTitle from '../components/HeaderTitle';

// import { FixedButton } from '../components/FixedButton';

const menuIcon = require('../assets/images/menu_icon.png');
const paypalLogo = require('../assets/images/paypal-logo.png');
const paylogo = require('../assets/images/pay-image.png');

class Subscription extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderTitle section="subscription" />,
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomColor: '#fff'
            },
            headerTitleStyle: {
                fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
                fontSize: 17,
                fontWeight: '200'
            },
            headerLeft: (
                <View
                    style={{
                        left: 15,
                        top: -3,
                        paddingRight: 16
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                        <Image source={menuIcon} style={{ width: 20, height: 17 }} />
                    </TouchableWithoutFeedback>
                </View>
            )
        };
    };

    constructor(props) {
        super(props);

        console.ignoredYellowBox = ['Setting a timer'];
    }

    renderPlanInfo() {
        const { signUpPlan, appLanguage, signUpState } = this.props;
        const txt = translation[appLanguage];

        if (signUpPlan.planId === '01-SD-PAYG') {
            return (
                <View>
                    <View style={style.userDetails}>
                        <Image source={paylogo} style={style.paypalLogo} />
                    </View>
                    <View style={style.planDetailsWrap}>
                        <Text style={style.planName}>{txt.SignUpPersonalData.planPAYGName}</Text>
                        <Text style={[style.planDetails, { marginBottom: 0 }]}>
                            {txt.SignUpPersonalData.planPAYGDesc}
                        </Text>
                    </View>
                </View>
            );
        }
        return (
            <View>
                <View style={style.userDetails}>
                    <Image source={paypalLogo} style={style.paypalLogo} />
                </View>
                <View style={style.planDetailsWrap}>
                    <Text style={style.planName}>{signUpState}</Text>
                    <Text style={style.planDetails}>
                        {signUpPlan.planVisits} {txt.SignUpPersonalData.planPaidVisitsTxt} -{' '}
                        {signUpPlan.planCalls} {txt.SignUpPersonalData.planPaidSupportTxt}
                    </Text>
                    <Text style={[style.planDetails, { marginBottom: 0 }]}>
                        {txt.SignUpPersonalData.planPaidPreDesc}
                        {signUpPlan.planPrice} {txt.SignUpPersonalData.planPaidPostDesc}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        const { appLanguage, paypalEmail, paypalName } = this.props;
        const txt = translation[appLanguage];

        return (
            <SafeAreaView style={style.safeArea}>
                <ScrollView>
                    {this.renderPlanInfo()}
                    <View>
                        <View style={style.inputWrap}>
                            <Text style={style.inputLabel}>
                                {txt.SignUpPersonalData.signUpName}
                            </Text>
                            <Text style={style.inputChangeMapText}>{paypalName}</Text>
                        </View>
                        <View style={style.inputWrap}>
                            <Text style={style.inputLabel}>
                                {txt.SignUpPersonalData.signUpEmail}
                            </Text>
                            <Text style={style.inputChangeMapText}>{paypalEmail}</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        appLanguage: state.generalReducer.appLanguage,
        paypalName: state.signUpReducer.paypalName,
        paypalEmail: state.signUpReducer.paypalEmail,
        signUpPlan: state.signUpReducer.signUpPlan,
        signUpState: state.signUpReducer.signUpState
    };
};

export default connect(mapStateToProps)(Subscription);

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    paypalLogo: {
        width: 180,
        height: 178,
        marginTop: 30,
        marginBottom: 30
    },
    userDetails: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    userName: {
        color: '#1D1D26',
        fontSize: 25,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontWeight: '200'
    },
    planType: {
        color: '#909190',
        fontSize: 13,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
    },
    planDetailsWrap: {
        backgroundColor: '#2C2A25',
        paddingBottom: 15,
        paddingTop: 15,
        alignItems: 'center'
    },
    planName: {
        color: '#fff',
        fontSize: 25,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontWeight: '200'
    },
    planDetails: {
        color: '#fff',
        fontSize: 12,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        marginBottom: 15
    },
    formSectionHeader: {
        backgroundColor: '#F8F8F9',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 18,
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F4'
    },
    formSectionHeaderText: {
        fontSize: 10
    },
    inputLabel: {
        fontSize: 12,
        color: '#959492'
    },
    inputChangeMapText: {
        fontSize: 14,
        color: '#1D1D26',
        marginTop: 3
    },
    inputWrap: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 18,
        paddingBottom: 18,
        borderTopColor: '#F3F3F4',
        borderTopWidth: 1
    }
});
