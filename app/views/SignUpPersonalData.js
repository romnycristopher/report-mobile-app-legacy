import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import _ from 'lodash';
import { 
    appLanguageAct, 
    signUpNameChangeAct, 
    signUpEmailChangeAct, 
    signUpPasswordChangeAct, 
    signUpConfirmPasswordChangeAct, 
    signUpCellPhoneChangeAct,
    signUpResidentialPhoneChangeAct,
    signUpAddressChangeAct,
    signUpPlanChangeAct,
    signUpApNameChangeAct,
    signUpApEmailChangeAct,
    signUpApCellPhoneChangeAct,
    signUpApResidentialPhoneChangeAct,
    getPlansDataAct 
} from '../actions';
import FloatingLabelInput from '../components/FloatingLabelInputs';
import { FixedButton } from '../components/FixedButton';
import * as translation from '../config/lang.json';

//Images
const closeBtnImage = require('../assets/images/close-btn.png');

class SignUpPersonalData extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title', 'Sign Up'),
          headerBackTitle: null,
          headerBackImage: <Image style={styles.backBtn} source={closeBtnImage} />
        };
    };

    constructor(props) {
        super(props);

        this.onSignUpNameChange = this.onSignUpNameChange.bind(this);
        this.onSignUpEmailChange = this.onSignUpEmailChange.bind(this);
        this.onSignUpPasswordChange = this.onSignUpPasswordChange.bind(this);
        this.onSignUpPasswordConfirmChange = this.onSignUpPasswordConfirmChange.bind(this);
        this.onSignUpCellphoneChange = this.onSignUpCellphoneChange.bind(this);
        this.onSignUpResidentialPhoneChange = this.onSignUpResidentialPhoneChange.bind(this);
        this.onSignUpAddressChange = this.onSignUpAddressChange.bind(this);
        this.onsignUpPlanChange = this.onsignUpPlanChange.bind(this);
        this.onSignUpApNameChange = this.onSignUpApNameChange.bind(this);
        this.onSignUpApEmailChange = this.onSignUpApEmailChange.bind(this);
        this.onSignUpApCellPhoneChange = this.onSignUpApCellPhoneChange.bind(this);
        this.onSignUpApResidentialPhoneChange = this.onSignUpApResidentialPhoneChange.bind(this);
    }

    componentWillMount() {
        this.props.getPlansDataAct();
    }

    onSignUpNameChange(signUpName) {
        this.props.signUpNameChangeAct(signUpName);
    }

    onSignUpEmailChange(signUpEmail) {
        this.props.signUpEmailChangeAct(signUpEmail);
    }

    onSignUpPasswordChange(signUpPassword) {
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

    onsignUpPlanChange(index, value) {
        this.props.signUpPlanChangeAct(value);
    } 

    renderPlanData() {
        const { signUpPlanData, appLanguage } = this.props;
        const txt = translation[appLanguage];

        const plansToRender = [];

        for (const plan of signUpPlanData) {
            if (plan.plan_price === 0) {
                plansToRender.push(
                    <RadioButton 
                        key={plan.uid} 
                        style={styles.radioButton}
                        value={{
                            planId: plan.uid, 
                            planState: plan.plan_state, 
                            planPrice: plan.plan_price, 
                            planDescription: plan.plan_description,
                            planVisits: plan.plan_visits,
                            planCalls: plan.plan_calls,
                        }}
                    >
                        <View>
                            <Text style={styles.radioButtonTitle}>
                                {plan.plan_state}
                            </Text>
                            <Text style={styles.radioButtonSubtitle}>
                                {txt.SignUpPersonalData.playPAYGText}
                            </Text>
                        </View>  
                    </RadioButton>
                );
            } else {
                plansToRender.push(
                    <RadioButton 
                        key={plan.uid} 
                        style={styles.radioButton} 
                        value={{
                            planId: plan.uid, 
                            planState: plan.plan_state, 
                            planPrice: plan.plan_price, 
                            planDescription: plan.plan_description,
                            planVisits: plan.plan_visits,
                            planCalls: plan.plan_calls,
                        }}
                    >
                        <View>
                            <Text style={styles.radioButtonTitle}>
                                {plan.plan_state}
                            </Text>
                            <Text style={styles.radioButtonSubtitle}>
                                {txt.SignUpPersonalData.planPriceText}{plan.plan_price}
                            </Text>
                        </View>                        
                    </RadioButton>
                );
            }            
        }

        return plansToRender;
    }

    render() {      
        const { 
            appLanguage, 
            signUpName, 
            signUpEmail, 
            signUpPassword, 
            signUpConfirmPassword,
            signUpCellPhone,
            signUpResidentialPhone,
            signUpAddress,
            signUpApName,
            signUpApEmail,
            signUpApCellPhone,
            signUpApResidentialPhone,
        } = this.props;
        const txt = translation[appLanguage];
        // console.log(this.props);

        return (
            <SafeAreaView style={styles.safeAreaView}>
                <ScrollView>
                <View style={styles.sectionTitleWrap}>
                    <Text style={styles.sectionTitle}>{txt.SignUpPersonalData.sectionTitle}</Text>
                    <Text style={styles.sectionSubtitle}>
                        {txt.SignUpPersonalData.sectionSubtitle}
                    </Text>
                </View>
                <View>
                    <FloatingLabelInput
                        label={txt.SignUpPersonalData.signUpName}
                        value={signUpName}
                        onChangeText={this.onSignUpNameChange}
                    />
                    <FloatingLabelInput
                        label={txt.SignUpPersonalData.signUpEmail}
                        value={signUpEmail}
                        onChangeText={this.onSignUpEmailChange}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                    />
                    <FloatingLabelInput
                        label={txt.SignUpPersonalData.signUpPassword}
                        secureTextEntry
                        value={signUpPassword}
                        onChangeText={this.onSignUpPasswordChange}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                    />
                    <FloatingLabelInput
                        label={txt.SignUpPersonalData.signUpConfirmPassword}
                        secureTextEntry
                        value={signUpConfirmPassword}
                        onChangeText={this.onSignUpPasswordConfirmChange}
                        autoCorrect={false}
                        autoCapitalize={'none'}
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
                    <FloatingLabelInput
                        label={txt.SignUpPersonalData.signUpAddress}
                        value={signUpAddress}
                        onChangeText={this.onSignUpAddressChange}
                    />
                    <View style={styles.formSectionHeader}>
                        <Text style={styles.formSectionHeaderText}>
                            {txt.SignUpPersonalData.subscriptionAndPlanTitle}
                        </Text>
                    </View>
                    <View>
                    
                        <RadioGroup
                            onSelect={(index, value) => this.onsignUpPlanChange(index, value)}
                            thickness={2}
                            color='#959492'
                            activeColor='#2C2A25'
                        >
                            {this.renderPlanData()}
                        </RadioGroup>
                    </View>
                    <View style={styles.formSectionHeader}>
                        <Text style={styles.formSectionHeaderText}>
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
                        onChangeText={this.onSignUpApEmailChange}
                        autoCapitalize={'none'}
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
                    <FixedButton
                        text={txt.general.btnNextText}
                        onPress={
                            () => this.props.navigation.navigate('MapSignUp', { 
                                title: txt.MapSignUp.headerTitle 
                            })
                        }
                    />  
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
    backBtn: {
        width: 18,
        height: 18,
        marginLeft: 15
    },
    sectionTitleWrap: {
        backgroundColor: '#F8F8F9',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 60,
    },
    sectionTitle: {
        fontSize: 30,
        width: 230,
        fontFamily: 'Avenir',
        letterSpacing: 1,
        fontWeight: '300',
        textAlign: 'center'
    },
    sectionSubtitle: {
        fontSize: 14,
        width: 230,
        fontFamily: 'Avenir',
        fontWeight: '300',
        textAlign: 'center'
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
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomColor: '#F3F3F4',
        borderBottomWidth: 1,
    },
    radioButtonTitle: {
        fontWeight: '700',
    },
    radioButtonSubtitle: {
        color: '#959492',
        
    }

});

const mapStateToProps = state => {
    const signUpPlanDataArr = _.map(state.signUpReducer.signUpPlanData, (val, uid) => {
        return { ...val, uid };
    });

    return {
        appLanguage: state.generalReducer.appLanguage,
        signUpName: state.signUpReducer.signUpName,
        signUpEmail: state.signUpReducer.signUpEmail,
        signUpPassword: state.signUpReducer.signUpPassword,
        signUpConfirmPassword: state.signUpReducer.signUpConfirmPassword,
        signUpCellPhone: state.signUpReducer.signUpCellPhone,
        signUpResidentialPhone: state.signUpReducer.signUpResidentialPhone,
        signUpAddress: state.signUpReducer.signUpAddress,
        signUpPlan: state.signUpReducer.signUpPlan,
        signUpApName: state.signUpReducer.signUpApName,
        signUpApEmail: state.signUpReducer.signUpApEmail,
        signUpApCellPhone: state.signUpReducer.signUpApCellPhone,
        signUpApResidentialPhone: state.signUpReducer.signUpApResidentialPhone,
        signUpPlanData: signUpPlanDataArr
    };
};

export default connect(mapStateToProps, { 
    appLanguageAct,
    signUpNameChangeAct, 
    signUpEmailChangeAct, 
    signUpPasswordChangeAct, 
    signUpConfirmPasswordChangeAct, 
    signUpCellPhoneChangeAct,
    signUpResidentialPhoneChangeAct,
    signUpAddressChangeAct,
    signUpPlanChangeAct,
    signUpApNameChangeAct,
    signUpApEmailChangeAct,
    signUpApCellPhoneChangeAct,
    signUpApResidentialPhoneChangeAct,
    getPlansDataAct  
})(SignUpPersonalData);
