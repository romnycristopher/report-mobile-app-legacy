import React, { Component } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { resetPasswordAct, appLanguageAct } from '../actions';
import FloatingLabelInput from '../components/FloatingLabelInputs';
import * as translation from '../config/lang.json';

//Images
const imgAppBgRed = require('../assets/images/app_bg-red.png');
const imgLanguageIcon = require('../assets/images/language_icon.png');
const imgLogoWhite = require('../assets/images/logo-white.png');

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        
        this.handleResetPasswordEmailChange = this.handleResetPasswordEmailChange.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    onSubmitResetPassword = () => {
        console.log('Password Reseted Submitted!');
    };

    changeLanguage() {
        this.props.appLanguageAct();
    }

    handleResetPasswordEmailChange(email) {
        this.props.resetPasswordAct(email);
    }

    render() {
        console.log(this.props);
        const { email, appLanguage } = this.props;
        const txt = translation[appLanguage];

        return (
            <SafeAreaView style={styles.safeArea}>
                <Image source={imgAppBgRed} style={styles.loginForm_Bg} />
                <View>
                    <TouchableOpacity
                        style={styles.loginForm_languageWrap}
                        onPress={this.changeLanguage}
                    >
                        <Image
                            style={styles.loginForm_languageIcon}
                            source={imgLanguageIcon}
                        />
                        <Text style={styles.loginForm_languageText}>
                            {txt.general.language}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Image source={imgLogoWhite} style={styles.loginForm_WhiteLogo} />
                    <View>
                        <Text style={styles.loginForm_Title}> {txt.resetPassword.title} </Text>
                        <Text style={styles.loginForm_SubTitle}>
                            {txt.resetPassword.subTitle}
                        </Text>
                    </View>
                </View>
                <View>
                    <FloatingLabelInput
                        label={txt.resetPassword.resetPasswordLabel}
                        value={email}
                        onChangeText={this.handleResetPasswordEmailChange}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                    />
                    <TouchableHighlight onPress={this.onSubmitResetPassword}>
                        <View style={styles.loginForm_submitBtn}>
                            <Text style={styles.loginForm_submitBtnText}>
                                {txt.resetPassword.submitResetPassword}
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <View style={styles.loginForm_subBtnsWrap}>
                        <TouchableOpacity
                             onPress={Actions.signUpScene}
                        >
                            <View>
                                <Text style={styles.loginForm_subBtnsText}>
                                    {txt.resetPassword.createAccountBtn}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={Actions.pop}
                        >
                            <View>
                                <Text style={styles.loginForm_subBtnsText}>
                                    {txt.resetPassword.signInBtn}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.authReducer.email,
        appLanguage: state.generalReducer.appLanguage
    };
};

export default connect(mapStateToProps, { 
    resetPasswordAct, 
    appLanguageAct 
})(ResetPassword);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'space-between'
    },
    loginForm_Bg: {
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        flex: 1
    },
    loginForm_languageWrap: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        paddingRight: 20,
        marginTop: 5
    },
    loginForm_languageIcon: {
        width: 16,
        height: 17,
        marginRight: 7
    },
    loginForm_languageText: {
        color: '#fff',
        fontSize: 17
    },
    loginForm_WhiteLogo: {
        width: 113,
        height: 116,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 50
    },
    loginForm_Title: {
        fontSize: 25,
        fontFamily: 'Avenir',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center'
    },
    loginForm_SubTitle: {
        fontSize: 14,
        fontFamily: 'Avenir',
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 40,
        paddingRight: 40
    },
    loginForm_submitBtn: {
        backgroundColor: '#2C2A25'
    },
    loginForm_submitBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        paddingTop: 20,
        paddingBottom: 20
    },
    loginForm_subBtnsWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    loginForm_subBtnsText: {
        color: '#fff'
    }
});
