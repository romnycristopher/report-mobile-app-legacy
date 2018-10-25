import firebase from 'firebase';
import NavigationService from '../config/NavigationService';
import * as translation from '../config/lang.json';


export const signUpNameChangeAct = signUpName => {
    return {
        type: 'SIGNUP_NAME_CHANGE',
        payload: signUpName
    };
};

export const signUpEmailChangeAct = signUpEmail => {
    return {
        type: 'SIGNUP_EMAIL_CHANGE',
        payload: signUpEmail
    };
};

export const signUpPasswordChangeAct = signUpPassword => {
    return {
        type: 'SIGNUP_PASSWORD_CHANGE',
        payload: signUpPassword
    };
};

export const signUpConfirmPasswordChangeAct = signUpConfirmPassword => {
    return {
        type: 'SIGNUP_CONFIRMPASSWORD_CHANGE',
        payload: signUpConfirmPassword
    };
};

export const signUpCellPhoneChangeAct = signUpCellPhone => {
    return {
        type: 'SIGNUP_CELLPHONE_CHANGE',
        payload: signUpCellPhone
    };
};

export const signUpResidentialPhoneChangeAct = signUpResidentialPhone => {
    return {
        type: 'SIGNUP_RESIDENTIALPHONE_CHANGE',
        payload: signUpResidentialPhone
    };
};

export const signUpAddressChangeAct = signUpAddress => {
    return {
        type: 'SIGNUP_ADDRESS_CHANGE',
        payload: signUpAddress
    };
};

export const signUpPlanChangeAct = signUpPlan => {
    return {
        type: 'SIGNUP_PLAN_CHANGE',
        payload: signUpPlan
    };
};

export const signUpApNameChangeAct = signUpApName => {
    return {
        type: 'SIGNUP_AP_NAME_CHANGE',
        payload: signUpApName
    };
};

export const signUpApEmailChangeAct = signUpApEmail => {
    return {
        type: 'SIGNUP_AP_EMAIL_CHANGE',
        payload: signUpApEmail
    };
};

export const signUpApCellPhoneChangeAct = signUpApCellPhone => {
    return {
        type: 'SIGNUP_AP_CELLPHONE_CHANGE',
        payload: signUpApCellPhone
    };
};

export const signUpApResidentialPhoneChangeAct = signUpApResidentialPhone => {
    return {
        type: 'SIGNUP_AP_RESIDENTIALPHONE_CHANGE',
        payload: signUpApResidentialPhone
    };
};

export const signUpLatLongChangeAct = signUpLatLong => {
    return {
        type: 'SIGNUP_USER_LATLONG_CHANGE',
        payload: signUpLatLong
    };
};

export const getPlansDataAct = () => {
    return (dispatch) => {
        firebase.database().ref('plans/').once('value', (snapshot) => {
            dispatch({ type: 'GET_PLAN_DATA', payload: snapshot.val() });
        });
    };
};

export const createPaidUserAct = ({ 
    signUpName,
    signUpEmail,
    signUpPassword,
    signUpCellPhone,
    signUpResidentialPhone,
    signUpAddress,
    signUpPlan,
    signUpApName,
    signUpApEmail,
    signUpApCellPhone,
    signUpApResidentialPhone,
    signUpLatLong,
    appLanguage
  }) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword)
        .then(user => {
            dispatch({ type: 'USER_LOGIN_CREATED', payload: user.user.uid });

            const fbUsersRef = firebase.database().ref(`users/${user.user.uid}/`);
            
            fbUsersRef.set({
                roles: {
                    user: true
                },
                userFbId: user.user.uid,
                name: signUpName,
                email: signUpEmail,
                CellPhone: signUpCellPhone,
                residentialPhone: signUpResidentialPhone,
                address: signUpAddress,
                state: signUpPlan.planState,
                latitude: signUpLatLong.latitude,
                longitude: signUpLatLong.longitude,
                additionalPersonName: signUpApName,
                additionalPersonEmail: signUpApEmail,
                additionalPersonCellPhone: signUpApCellPhone,
                additionalPersonResPhone: signUpApResidentialPhone,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                status: 'Paypal Pending',
                planType: 'Paid',
                planId: signUpPlan.planId,
                planPrice: signUpPlan.planPrice,
                planDescription: signUpPlan.planDescription,
                paypalEmail: 'N/A',
                paypalName: 'N/A',
                paypalPayerdID: 'N/A',
                paypalAgreementId: 'N/A',
                paypalBillindDate: 'N/A'
            });

            fbUsersRef.on('value', (snapshot) => {
                console.log(snapshot.val().status);
                if (snapshot.val().status === 'Active') {
                    console.log('You did it');
                    fbUsersRef.off();
                }
            });

            //Pass user to paypal webview
            const txt = translation[appLanguage];
            NavigationService.navigate('PaypalWebview', {
                title: txt.PaypalWebview.headerTitle
            });
        }).catch((error) => console.log(`Error: ${error}`));
    };
};

export const createPAYGUserAct = ({ 
    signUpName,
    signUpEmail,
    signUpPassword,
    signUpCellPhone,
    signUpResidentialPhone,
    signUpAddress,
    signUpPlan,
    signUpApName,
    signUpApEmail,
    signUpApCellPhone,
    signUpApResidentialPhone,
    signUpLatLong,
  }) => {
    return (dispatch) => {
        // console.log(`Email:${signUpEmail} Password:${signUpPassword}`);
        firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword)
        .then(user => {
            dispatch({ type: 'USER_LOGIN_CREATED', payload: user.user.uid });

            firebase.database().ref(`users/${user.user.uid}/`)
            .set({
                roles: {
                    user: true
                },
                userFbId: user.user.uid,
                name: signUpName,
                email: signUpEmail,
                CellPhone: signUpCellPhone,
                residentialPhone: signUpResidentialPhone,
                address: signUpAddress,
                state: signUpPlan.planState,
                latitude: signUpLatLong.latitude,
                longitude: signUpLatLong.longitude,
                additionalPersonName: signUpApName,
                additionalPersonEmail: signUpApEmail,
                additionalPersonCellPhone: signUpApCellPhone,
                additionalPersonResPhone: signUpApResidentialPhone,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                status: 'Active',
                planType: 'Pay as you go',
                planId: signUpPlan.planId,
                planPrice: signUpPlan.planPrice,
                planDescription: signUpPlan.planDescription,
                paypalEmail: 'N/A',
                paypalName: 'N/A',
                paypalPayerdID: 'N/A',
                paypalAgreementId: 'N/A',
                paypalBillindDate: 'N/A'
            });
        }).catch((error) => console.log(error));
    };
};
