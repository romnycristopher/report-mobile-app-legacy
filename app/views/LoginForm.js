import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    emailChangeAct,
    passwordChangeAct,
    appLanguageAct,
    loginUserAct,
    loginFormResetErrorAct
} from '../actions';
import FloatingLabelInput from '../components/FloatingLabelInputs';
import * as translation from '../config/lang.json';

//Images
const imgAppBgRed = require('../assets/images/app_bg-red.png');
const imgLanguageIcon = require('../assets/images/language_icon.png');
const imgLogoWhite = require('../assets/images/logo-white.png');

class LoginForm extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);

        console.ignoredYellowBox = ['Setting a timer'];
    }
    componentDidUpdate() {
        const { signUpError, appLanguage } = this.props;
        const txt = translation[appLanguage];

        if (signUpError.code) {
            switch (signUpError.code) {
                //Wrong Email
                case 'auth/invalid-email':
                    Alert.alert(txt.login.loginErrorTitle, txt.login.loginErrorEmail, [
                        { text: 'OK' }
                    ]);
                    break;
                //Wrong password
                case 'auth/wrong-password':
                    Alert.alert(txt.login.loginErrorTitle, txt.login.loginErrorPassword, [
                        { text: 'OK' }
                    ]);
                    break;
                //User not found
                case 'auth/user-not-found':
                    Alert.alert(txt.login.loginErrorTitle, txt.login.loginErrorNoUser, [
                        { text: 'OK' }
                    ]);
                    break;
                //Too many requests
                case 'auth/too-many-requests':
                    Alert.alert(txt.login.loginErrorTitle, txt.login.loginErrorTooManyRequest, [
                        { text: 'OK' }
                    ]);
                    break;
                default:
                    Alert.alert(txt.login.loginErrorTitle, txt.login.loginErrorDefault, [
                        { text: 'OK' }
                    ]);
            }
            this.props.loginFormResetErrorAct();
        }
    }

    onSubmitLogin = () => {
        // console.log('Sign In Form Submitted!');
        const { email, password } = this.props;
        this.props.loginUserAct({ email, password });
    };

    changeLanguage() {
        this.props.appLanguageAct();
    }

    handleEmailChange(email) {
        this.props.emailChangeAct(email);
    }

    handlePasswordChange(password) {
        this.props.passwordChangeAct(password);
    }

    render() {
        const { email, password, appLanguage } = this.props;
        const txt = translation[appLanguage];

        return (
            <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
                <SafeAreaView style={styles.safeArea}>
                    <Image source={imgAppBgRed} style={styles.loginForm_Bg} />
                    <View>
                        <TouchableOpacity
                            style={styles.loginForm_languageWrap}
                            onPress={this.changeLanguage}
                        >
                            <Image style={styles.loginForm_languageIcon} source={imgLanguageIcon} />
                            <Text style={styles.loginForm_languageText}>
                                {txt.general.language}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image source={imgLogoWhite} style={styles.loginForm_WhiteLogo} />
                        <View>
                            <Text style={styles.loginForm_Title}> {txt.login.title} </Text>
                            <Text style={styles.loginForm_SubTitle}>{txt.login.subTitle}</Text>
                        </View>
                    </View>
                    <View>
                        <FloatingLabelInput
                            label={txt.login.loginFormEmailLabel}
                            value={email}
                            onChangeText={this.handleEmailChange}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            secondStyle
                        />
                        <FloatingLabelInput
                            label={txt.login.loginFormPassLabel}
                            secureTextEntry
                            value={password}
                            onChangeText={this.handlePasswordChange}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            secondStyle
                        />
                        <TouchableHighlight onPress={this.onSubmitLogin}>
                            <View style={styles.loginForm_submitBtn}>
                                <Text style={styles.loginForm_submitBtnText}>
                                    {txt.login.loginFormSubmitInput}
                                </Text>
                            </View>
                        </TouchableHighlight>

                        <View style={styles.loginForm_subBtnsWrap}>
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate('SignUpPersonalData', {
                                        title: txt.SignUpPersonalData.headerTitle
                                    })
                                }
                            >
                                <View>
                                    <Text style={styles.loginForm_subBtnsText}>
                                        {txt.login.createAccount}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('ResetPassword')}
                            >
                                <View>
                                    <Text style={styles.loginForm_subBtnsText}>
                                        {txt.login.forgotPassword}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.authReducer.email,
        password: state.authReducer.password,
        signUpError: state.authReducer.signUpError,
        appLanguage: state.generalReducer.appLanguage
    };
};

export default connect(
    mapStateToProps,
    {
        emailChangeAct,
        passwordChangeAct,
        appLanguageAct,
        loginUserAct,
        loginFormResetErrorAct
    }
)(LoginForm);

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
        marginTop: 12
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
        marginBottom: 30
    },
    loginForm_Title: {
        fontSize: 25,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center'
    },
    loginForm_SubTitle: {
        fontSize: 14,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
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
