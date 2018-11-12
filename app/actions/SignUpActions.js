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

export const signUpStateChangeAct = signUpState => {
    return {
        type: 'SIGNUP_STATE_CHANGE',
        payload: signUpState
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
    return dispatch => {
        firebase
            .database()
            .ref('plans/')
            .once('value', snapshot => {
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
    return dispatch => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
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
                    planVisits: signUpPlan.planVisits,
                    planCalls: signUpPlan.planCalls,
                    paypalEmail: 'N/A',
                    paypalName: 'N/A',
                    paypalPayerdID: 'N/A',
                    paypalAgreementId: 'N/A',
                    paypalBillindDate: 'N/A'
                });

                //Pass user to paypal webview
                const txt = translation[appLanguage];
                NavigationService.navigate('PaypalWebview', {
                    title: txt.PaypalWebview.headerTitle
                });

                fbUsersRef.on('value', snapshot => {
                    if (snapshot.val().status === 'Active') {
                        dispatch(getProblemsListAct());
                        dispatch(getHouseAreasAct());
                        dispatch(getUserReportsAct(user.user.uid));
                        dispatch(getUserDataAct(user.user.uid));
                        NavigationService.navigate('DrawerStack');
                        fbUsersRef.off();
                    }
                });
            })
            .catch(error => console.log(`Error: ${error}`));
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
    signUpLatLong
}) => {
    return dispatch => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
            .then(user => {
                dispatch({ type: 'USER_LOGIN_CREATED', payload: user.user.uid });

                firebase
                    .database()
                    .ref(`users/${user.user.uid}/`)
                    .set(
                        {
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
                        },
                        error => {
                            if (error) {
                                console.log(error);
                            } else {
                                dispatch(getProblemsListAct());
                                dispatch(getHouseAreasAct());
                                dispatch(getUserReportsAct(user.user.uid));
                                dispatch(getUserDataAct(user.user.uid));
                                NavigationService.navigate('DrawerStack');
                            }
                        }
                    );
            })
            .catch(error => console.log(error));
    };
};

//
// ─── GET LISTS OF PROBLEMS AVAILABLE TO REPORTS ─────────────────────────────────
//
export const getProblemsListAct = () => {
    return dispatch => {
        const fbReference = firebase.database().ref('problems/');
        fbReference.on('value', snapshot => {
            // console.log('List of problems');
            dispatch({ type: 'GETPROBLEMLIST', payload: snapshot.val() });
        });
    };
};

//
// ─── GET HOUSE AREAS ────────────────────────────────────────────────────────────
//
export const getHouseAreasAct = () => {
    return dispatch => {
        const fbReference = firebase.database().ref('houseAreas/');
        // console.log('House areas');
        fbReference.on('value', snapshot => {
            dispatch({ type: 'GETHOUSEAREAS', payload: snapshot.val() });
        });
    };
};

//
// ─── GET USER REPORTS ───────────────────────────────────────────────────────────
//
export const getUserReportsAct = userUid => {
    return dispatch => {
        // console.log(userUid);
        const fbReference = firebase.database().ref(`reports/${userUid}`);
        // console.log(fbReference);
        // console.log(typeof fbReference);
        fbReference.on('value', snapshot => {
            // console.log(snapshot.val());
            if (snapshot.val() !== null) {
                let activeProblemCount = 0;
                Object.entries(snapshot.val()).forEach(value => {
                    // console.log(value[1].status);
                    if (value[1].status === 'open' || value[1].status === 'working') {
                        activeProblemCount++;
                    }
                });
                dispatch({ type: 'GETUSERREPORTSCOUNT', payload: activeProblemCount });
                dispatch({ type: 'GETUSERREPORTS', payload: snapshot.val() });
            }
        });
    };
};

//
// ─── GET USER DATA ────────────────────────────────────────────────────────────
//
export const getUserDataAct = userUid => {
    return dispatch => {
        // console.log(userUid);
        const fbReference = firebase.database().ref(`users/${userUid}`);

        fbReference.on('value', snapshot => {
            dispatch({ type: 'USER_LOGIN_CREATED', payload: userUid });
            dispatch({ type: 'SIGNUP_NAME_CHANGE', payload: snapshot.val().name });
            dispatch({ type: 'SIGNUP_EMAIL_CHANGE', payload: snapshot.val().email });
            dispatch({ type: 'SIGNUP_CELLPHONE_CHANGE', payload: snapshot.val().CellPhone });
            dispatch({
                type: 'SIGNUP_RESIDENTIALPHONE_CHANGE',
                payload: snapshot.val().residentialPhone
            });
            dispatch({ type: 'SIGNUP_ADDRESS_CHANGE', payload: snapshot.val().address });
            const signUpLatLong = {
                latitude: snapshot.val().latitude,
                longitude: snapshot.val().longitude
            };
            dispatch({ type: 'SIGNUP_USER_LATLONG_CHANGE', payload: signUpLatLong });
            dispatch({ type: 'SIGNUP_STATE_CHANGE', payload: snapshot.val().state });
            dispatch({
                type: 'SIGNUP_AP_NAME_CHANGE',
                payload: snapshot.val().additionalPersonName
            });
            dispatch({
                type: 'SIGNUP_AP_EMAIL_CHANGE',
                payload: snapshot.val().additionalPersonEmail
            });
            dispatch({
                type: 'SIGNUP_AP_CELLPHONE_CHANGE',
                payload: snapshot.val().additionalPersonCellPhone
            });
            dispatch({
                type: 'SIGNUP_AP_RESIDENTIALPHONE_CHANGE',
                payload: snapshot.val().additionalPersonResPhone
            });
            const signUpPlan = {
                planPrice: snapshot.val().planPrice,
                planVisits: snapshot.val().planVisits,
                planCalls: snapshot.val().planCalls,
                planId: snapshot.val().planId,
                planType: snapshot.val().planType
            };
            dispatch({
                type: 'SIGNUP_PLAN_CHANGE',
                payload: signUpPlan
            });
            dispatch({
                type: 'SIGNUP_PPAGREEMENTID_CHANGE',
                payload: snapshot.val().paypalAgreementId
            });
            dispatch({
                type: 'SIGNUP_PPBILLINGDATE_CHANGE',
                payload: snapshot.val().paypalBillindDate
            });
            dispatch({ type: 'SIGNUP_PPEMAIL_CHANGE', payload: snapshot.val().paypalEmail });
            dispatch({ type: 'SIGNUP_PPNAME_CHANGE', payload: snapshot.val().paypalName });
            dispatch({ type: 'SIGNUP_PPPAYERID_CHANGE', payload: snapshot.val().paypalPayerdID });
            // console.log(snapshot.val());
        });
    };
};

export const currentPasswordAct = currentPassword => {
    return {
        type: 'CURRENT_PASSWORD',
        payload: currentPassword
    };
};

export const secureDataModalAct = status => {
    return {
        type: 'SECUREDATAMODAL',
        payload: status
    };
};

export const alertDataUpdateSuccessAct = status => {
    return {
        type: 'ALERT_DATAUPDATE',
        payload: status
    };
};
