import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Modal,
    TouchableHighlight,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import firebase from 'firebase';

// import { Header } from '../components/Header';
import FloatingLabelInput from '../components/FloatingLabelInputs';
import InputDataShow from '../components/InputDataShow';
import { FixedButton } from '../components/FixedButton';
import * as translation from '../config/lang.json';
import HeaderTitle from '../components/HeaderTitle';
import {
    updateUserDataAct,
    updateValueAct,
    signUpNameChangeAct,
    signUpEmailChangeAct,
    signUpPasswordChangeAct,
    signUpConfirmPasswordChangeAct,
    signUpCellPhoneChangeAct,
    signUpResidentialPhoneChangeAct,
    signUpAddressChangeAct,
    signUpApNameChangeAct,
    signUpApEmailChangeAct,
    signUpApCellPhoneChangeAct,
    signUpApResidentialPhoneChangeAct,
    alertDataUpdateSuccessAct,
    currentEmailAct,
    currentPasswordAct,
    updateUserSecureDataAct,
    secureDataModalAct
} from '../actions';

const menuIcon = require('../assets/images/menu_icon.png');
const closeBtn = require('../assets/images/close-btn.png');

class UserProfile extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderTitle section="profile" />,
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
                        top: -3
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

        this.onSignUpNameChange = this.onSignUpNameChange.bind(this);
        this.onSignUpEmailChange = this.onSignUpEmailChange.bind(this);
        this.onSignUpPasswordChange = this.onSignUpPasswordChange.bind(this);
        // this.onSignUpPasswordConfirmChange = this.onSignUpPasswordConfirmChange.bind(this);
        this.onSignUpCellphoneChange = this.onSignUpCellphoneChange.bind(this);
        this.onSignUpResidentialPhoneChange = this.onSignUpResidentialPhoneChange.bind(this);
        this.onSignUpAddressChange = this.onSignUpAddressChange.bind(this);
        this.onSignUpApNameChange = this.onSignUpApNameChange.bind(this);
        this.onSignUpApEmailChange = this.onSignUpApEmailChange.bind(this);
        this.onSignUpApCellPhoneChange = this.onSignUpApCellPhoneChange.bind(this);
        this.onSignUpApResidentialPhoneChange = this.onSignUpApResidentialPhoneChange.bind(this);
        this.onUpdateUserData = this.onUpdateUserData.bind(this);
        this.onCurrentPass = this.onCurrentPass.bind(this);
        this.onUpdateSecureData = this.onUpdateSecureData.bind(this);

        console.ignoredYellowBox = ['Setting a timer'];
    }

    state = {
        reauthenticatePass: false,
        reauthenticateModal: false,
        authModalError: false,
        authModalErrorTitle: '',
        authModalErrorDesc: ''
    };

    onSignUpNameChange(signUpName) {
        this.props.signUpNameChangeAct(signUpName);
    }

    onSignUpEmailChange(signUpEmail) {
        this.setState({ reauthenticateEmail: true });
        this.props.signUpEmailChangeAct(signUpEmail);
    }

    onSignUpPasswordChange(signUpPassword) {
        if (signUpPassword !== '') {
            this.setState({ reauthenticatePass: true });
        } else {
            this.setState({ reauthenticatePass: false });
        }

        this.props.signUpPasswordChangeAct(signUpPassword);
    }

    onSignUpPasswordConfirmChange(signUpConfirmPassword) {
        this.props.signUpConfirmPasswordChangeAct(signUpConfirmPassword);
    }

    onSignUpCellphoneChange(signUpCellPhone) {
        this.props.signUpCellPhoneChangeAct(signUpCellPhone);
    }

    onSignUpResidentialPhoneChange(signUpResidentialPhone) {
        this.props.signUpResidentialPhoneChangeAct(signUpResidentialPhone);
    }

    onSignUpAddressChange(signUpAddress) {
        this.props.signUpAddressChangeAct(signUpAddress);
    }

    onSignUpApNameChange(signUpApName) {
        this.props.signUpApNameChangeAct(signUpApName);
    }

    onSignUpApEmailChange(signUpApEmail) {
        this.props.signUpApEmailChangeAct(signUpApEmail);
    }

    onSignUpApCellPhoneChange(signUpApCellPhone) {
        this.props.signUpApCellPhoneChangeAct(signUpApCellPhone);
    }

    onSignUpApResidentialPhoneChange(signUpApResidentialPhone) {
        this.props.signUpApResidentialPhoneChangeAct(signUpApResidentialPhone);
    }

    onCurrentPass(currentPassword) {
        this.props.currentPasswordAct(currentPassword);
    }

    onUpdateUserData() {
        if (this.state.reauthenticatePass === true || this.state.reauthenticateEmail === true) {
            this.props.secureDataModalAct(true);
        } else {
            const {
                // appLanguage,
                userFbId,
                signUpName,
                signUpAddress,
                signUpCellPhone,
                signUpResidentialPhone,
                signUpApName,
                signUpApEmail,
                signUpApCellPhone,
                signUpApResidentialPhone,
                signUpLatLong
            } = this.props;

            const fbReference = firebase.database().ref(`users/${userFbId}`);
            fbReference
                .update({
                    userFbId,
                    name: signUpName,
                    CellPhone: signUpCellPhone,
                    residentialPhone: signUpResidentialPhone,
                    address: signUpAddress,
                    latitude: signUpLatLong.latitude,
                    longitude: signUpLatLong.longitude,
                    additionalPersonName: signUpApName,
                    additionalPersonEmail: signUpApEmail,
                    additionalPersonCellPhone: signUpApCellPhone,
                    additionalPersonResPhone: signUpApResidentialPhone,
                    updatedAt: firebase.database.ServerValue.TIMESTAMP
                })
                .then(() => this.props.alertDataUpdateSuccessAct(true));
        }
    }

    onUpdateSecureData() {
        const {
            appLanguage,
            userFbId,
            signUpName,
            signUpAddress,
            signUpCellPhone,
            signUpResidentialPhone,
            signUpApName,
            signUpApEmail,
            signUpApCellPhone,
            signUpApResidentialPhone,
            signUpLatLong,
            currentPassword,
            signUpEmail,
            signUpPassword
        } = this.props;

        const txt = translation[appLanguage];
        this.props.secureDataModalAct(false);

        const user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        user.reauthenticateAndRetrieveDataWithCredential(cred)
            .then(() => {
                //Email
                user.updateEmail(signUpEmail)
                    .then(() => {
                        //Password
                        if (this.state.reauthenticatePass === true) {
                            user.updatePassword(signUpPassword)
                                .then(() => {
                                    //.Then Email
                                    this.setState({ reauthenticatePass: false });
                                    this.props.signUpPasswordChangeAct('');

                                    saveRemainingData();
                                })
                                .catch(error => {
                                    switch (error.code) {
                                        //Wrong Email
                                        case 'auth/weak-password':
                                            this.setState({
                                                authModalErrorDesc:
                                                    txt.userProfile.errorWeakPassword,
                                                authModalErrorTitle: txt.userProfile.errorTitle,
                                                authModalError: true
                                            });
                                            break;
                                        default:
                                            this.setState({
                                                authModalErrorDesc: txt.userProfile.errorDefault,
                                                authModalErrorTitle: txt.userProfile.errorTitle,
                                                authModalError: true
                                            });
                                    }
                                });
                        } else {
                            //.Then Email
                            this.setState({ reauthenticateEmail: false });
                            saveRemainingData();
                        }

                        this.props.currentPasswordAct('');
                    })
                    .catch(error => {
                        switch (error.code) {
                            //Wrong Email
                            case 'auth/invalid-email':
                                this.setState({
                                    authModalErrorDesc: txt.login.loginErrorEmail,
                                    authModalErrorTitle: txt.userProfile.errorTitle,
                                    authModalError: true
                                });
                                break;
                            default:
                                this.setState({
                                    authModalErrorDesc: txt.userProfile.errorDefault,
                                    authModalErrorTitle: txt.userProfile.errorTitle,
                                    authModalError: true
                                });
                        }
                    });
            })
            .catch(error => {
                console.log(error.code);
            });

        const saveRemainingData = () => {
            const fbReference = firebase.database().ref(`users/${userFbId}`);
            fbReference
                .update({
                    userFbId,
                    name: signUpName,
                    email: signUpEmail,
                    CellPhone: signUpCellPhone,
                    residentialPhone: signUpResidentialPhone,
                    address: signUpAddress,
                    latitude: signUpLatLong.latitude,
                    longitude: signUpLatLong.longitude,
                    additionalPersonName: signUpApName,
                    additionalPersonEmail: signUpApEmail,
                    additionalPersonCellPhone: signUpApCellPhone,
                    additionalPersonResPhone: signUpApResidentialPhone,
                    updatedAt: firebase.database.ServerValue.TIMESTAMP
                })
                .then(() => {
                    this.props.alertDataUpdateSuccessAct(true);
                });
        };
    }

    renderPlanInfo() {
        const { signUpPlan, signUpState, appLanguage } = this.props;
        const txt = translation[appLanguage];

        if (signUpPlan.planId === '01-SD-PAYG') {
            return (
                <View style={style.planDetailsWrap}>
                    <Text style={style.planName}>{txt.SignUpPersonalData.planPAYGName}</Text>
                    <Text style={[style.planDetails, { marginBottom: 0 }]}>
                        {txt.SignUpPersonalData.planPAYGDesc}
                    </Text>
                </View>
            );
        }
        return (
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
        );
    }

    render() {
        const {
            appLanguage,
            navigation,
            signUpName,
            signUpEmail,
            signUpAddress,
            signUpState,
            signUpCellPhone,
            signUpResidentialPhone,
            signUpApName,
            signUpApEmail,
            signUpApCellPhone,
            signUpApResidentialPhone,
            signUpPassword,
            currentPassword,
            secureDataModal,
            alertDataSuccess
        } = this.props;
        const txt = translation[appLanguage];

        return (
            <SafeAreaView style={style.safeArea}>
                <ScrollView>
                    <View style={style.userDetails}>
                        <Text style={style.userName}>{signUpName}</Text>
                    </View>
                    {this.renderPlanInfo()}
                    <View>
                        <FloatingLabelInput
                            label={txt.SignUpPersonalData.signUpName}
                            value={signUpName}
                            onChangeText={this.onSignUpNameChange}
                        />
                        <FloatingLabelInput
                            label={txt.SignUpPersonalData.signUpEmail}
                            value={signUpEmail}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            onChangeText={this.onSignUpEmailChange}
                        />
                        <FloatingLabelInput
                            label={txt.SignUpPersonalData.signUpNewPassword}
                            value={signUpPassword}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            secureTextEntry
                            onChangeText={this.onSignUpPasswordChange}
                        />
                        <FloatingLabelInput
                            label={txt.SignUpPersonalData.signUpAddress}
                            value={signUpAddress}
                            onChangeText={this.onSignUpAddressChange}
                        />
                        <InputDataShow
                            label={txt.SignUpPersonalData.signUpCity}
                            value={signUpState}
                            editable={false}
                            noChange
                        />
                        <FloatingLabelInput
                            label={txt.SignUpPersonalData.signUpCellPhone}
                            value={signUpCellPhone}
                            onChangeText={this.onSignUpCellphoneChange}
                        />
                        <FloatingLabelInput
                            label={txt.SignUpPersonalData.signUpResidentialPhone}
                            value={signUpResidentialPhone}
                            onChangeText={this.onSignUpResidentialPhoneChange}
                        />
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('MapUpdate', {
                                    title: txt.MapSignUp.headerTitle
                                })
                            }
                        >
                            <View style={style.changeMapTextWrap}>
                                <Text style={style.inputLabel}>
                                    {txt.SignUpPersonalData.signUpMapPosition}
                                </Text>
                                <Text style={style.inputChangeMapText}>
                                    {txt.SignUpPersonalData.signUpChangeMapPosition}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={style.formSectionHeader}>
                            <Text style={style.formSectionHeaderText}>
                                {txt.SignUpPersonalData.additionalPersonTitle}
                            </Text>
                        </View>
                        <FloatingLabelInput
                            label={txt.SignUpPersonalData.signUpName}
                            value={signUpApName}
                            onChangeText={this.onSignUpApNameChange}
                        />
                        <FloatingLabelInput
                            label={txt.SignUpPersonalData.signUpEmail}
                            value={signUpApEmail}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            onChangeText={this.onSignUpApEmailChange}
                        />
                        <FloatingLabelInput
                            label={txt.SignUpPersonalData.signUpCellPhone}
                            value={signUpApCellPhone}
                            onChangeText={this.onSignUpApCellPhoneChange}
                        />
                        <FloatingLabelInput
                            label={txt.SignUpPersonalData.signUpResidentialPhone}
                            value={signUpApResidentialPhone}
                            onChangeText={this.onSignUpApResidentialPhoneChange}
                        />
                    </View>
                </ScrollView>
                <View>
                    <FixedButton text={txt.userProfile.updateBtn} onPress={this.onUpdateUserData} />
                </View>

                {/* Modal */}
                <Modal animationType="fade" transparent visible={secureDataModal}>
                    <View style={style.modalContainer}>
                        <View style={style.modalStyle}>
                            <View style={style.modalHeader}>
                                <View style={style.closeModal}>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            this.props.secureDataModalAct(false);
                                        }}
                                    >
                                        <Image source={closeBtn} style={style.closeBtn} />
                                    </TouchableWithoutFeedback>
                                </View>
                                <Text style={style.modalTitle}>{txt.userProfile.reAuthTitle}</Text>
                            </View>
                            <View style={style.modalDescriptionWrap}>
                                <Text style={style.modalDescriptionText}>
                                    {txt.userProfile.reAuthDesc}
                                </Text>
                            </View>
                            <View>
                                <FloatingLabelInput
                                    label={txt.userProfile.reAuthPasswordLabel}
                                    value={currentPassword}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    secureTextEntry
                                    onChangeText={this.onCurrentPass}
                                />
                            </View>
                            <View>
                                <TouchableHighlight onPress={this.onUpdateSecureData}>
                                    <View style={style.modalOkBtn}>
                                        <Text style={style.modalOkBtnTxt}>
                                            {txt.userProfile.reAuthSubmitBtn}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal animationType="fade" transparent visible={alertDataSuccess}>
                    <View style={style.modalContainer}>
                        <View style={style.modalStyle}>
                            <View style={style.modalHeader}>
                                <Text style={style.modalTitle}>
                                    {txt.userProfile.profileUpdated}
                                </Text>
                            </View>
                            <View style={style.modalDescriptionWrap}>
                                <Text style={style.modalDescriptionText}>
                                    {txt.userProfile.profileUpdatedDesc}
                                </Text>
                            </View>
                            <View>
                                <TouchableHighlight
                                    onPress={() => this.props.alertDataUpdateSuccessAct(false)}
                                >
                                    <View style={style.modalOkBtn}>
                                        <Text style={style.modalOkBtnTxt}>Ok</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal animationType="fade" transparent visible={this.state.authModalError}>
                    <View style={style.modalContainer}>
                        <View style={style.modalStyle}>
                            <View style={style.modalHeader}>
                                <Text style={style.modalTitle}>
                                    {this.state.authModalErrorTitle}
                                </Text>
                            </View>
                            <View style={style.modalDescriptionWrap}>
                                <Text style={style.modalDescriptionText}>
                                    {this.state.authModalErrorDesc}
                                </Text>
                            </View>
                            <View>
                                <TouchableHighlight
                                    onPress={() => this.setState({ authModalError: false })}
                                >
                                    <View style={style.modalOkBtn}>
                                        <Text style={style.modalOkBtnTxt}>Ok</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        appLanguage: state.generalReducer.appLanguage,
        userFbId: state.signUpReducer.userFbId,
        signUpPlan: state.signUpReducer.signUpPlan,
        paypalAgreementId: state.signUpReducer.paypalAgreementId,
        signUpState: state.signUpReducer.signUpState,
        signUpName: state.signUpReducer.signUpName,
        signUpEmail: state.signUpReducer.signUpEmail,
        signUpAddress: state.signUpReducer.signUpAddress,
        signUpCellPhone: state.signUpReducer.signUpCellPhone,
        signUpResidentialPhone: state.signUpReducer.signUpResidentialPhone,
        signUpApName: state.signUpReducer.signUpApName,
        signUpApEmail: state.signUpReducer.signUpApEmail,
        signUpApCellPhone: state.signUpReducer.signUpApCellPhone,
        signUpApResidentialPhone: state.signUpReducer.signUpApResidentialPhone,
        signUpPassword: state.signUpReducer.signUpPassword,
        signUpConfirmPassword: state.signUpReducer.signUpConfirmPassword,
        signUpLatLong: state.signUpReducer.signUpLatLong,
        reportModal: state.ReportProblemReducer.reportModal,
        currentPassword: state.signUpReducer.currentPassword,
        secureDataModal: state.signUpReducer.secureDataModal,
        alertDataSuccess: state.signUpReducer.alertDataSuccess
    };
};

export default connect(
    mapStateToProps,
    {
        updateUserDataAct,
        updateValueAct,
        signUpNameChangeAct,
        signUpEmailChangeAct,
        signUpPasswordChangeAct,
        signUpConfirmPasswordChangeAct,
        signUpCellPhoneChangeAct,
        signUpResidentialPhoneChangeAct,
        signUpAddressChangeAct,
        signUpApNameChangeAct,
        signUpApEmailChangeAct,
        signUpApCellPhoneChangeAct,
        signUpApResidentialPhoneChangeAct,
        alertDataUpdateSuccessAct,
        currentEmailAct,
        currentPasswordAct,
        updateUserSecureDataAct,
        secureDataModalAct
    }
)(UserProfile);

const style = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#00000080',
        flex: 1,
        justifyContent: 'center',
        paddingRight: 15,
        paddingLeft: 15
    },
    modalOkBtn: {
        backgroundColor: '#2C2A25',
        paddingBottom: 20,
        paddingTop: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        marginBottom: -1
    },
    modalOkBtnTxt: {
        color: '#fff',
        fontSize: 17,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
    },
    modalStyle: {
        backgroundColor: '#fff',
        borderRadius: 3
    },
    modalHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 46
    },
    closeModal: {
        position: 'absolute',
        left: 10
    },
    modalDescriptionWrap: {
        backgroundColor: '#F8F8F9',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 15,
        paddingLeft: 15
    },
    modalDescriptionText: {
        fontSize: 13,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        textAlign: 'center'
    },
    modalItem: {
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F4'
    },
    modalItemText: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 14,
        textAlign: 'center'
    },
    modalTitle: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 17,
        fontWeight: '200'
    },
    closeBtn: {
        width: 18,
        height: 18
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
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
        color: '#F4313F',
        marginTop: 3
    },
    changeMapTextWrap: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 18,
        paddingBottom: 18
    }
});
