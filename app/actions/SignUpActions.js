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
