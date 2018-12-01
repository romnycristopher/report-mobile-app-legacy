const initialState = {
    currentPassword: '',
    signUpName: '',
    signUpEmail: '',
    signUpPassword: '',
    signUpConfirmPassword: '',
    signUpCellPhone: '',
    signUpResidentialPhone: '',
    signUpAddress: '',
    signUpState: '',
    signUpPlan: {
        planPrice: '',
        planVisits: '',
        planCalls: '',
        planId: '',
        planType: ''
    },
    signUpApName: '',
    signUpApEmail: '',
    signUpApCellPhone: '',
    signUpApResidentialPhone: '',
    signUpLatLong: {
        latitude: 18.471447,
        longitude: -69.9182
    },
    paypalAgreementId: '',
    paypalBillindDate: '',
    paypalEmail: '',
    paypalName: '',
    paypalPayerdID: '',
    userFbId: '',
    plansData: {},
    houseAreas: {},
    problems: {},
    reports: {},
    reportsCount: 0,
    secureDataModal: false,
    alertDataSuccess: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SECUREDATAMODAL':
            return { ...state, secureDataModal: action.payload };
        case 'CURRENT_PASSWORD':
            return { ...state, currentPassword: action.payload };
        case 'SIGNUP_NAME_CHANGE':
            return { ...state, signUpName: action.payload };
        case 'SIGNUP_EMAIL_CHANGE':
            return { ...state, signUpEmail: action.payload };
        case 'SIGNUP_PASSWORD_CHANGE':
            return { ...state, signUpPassword: action.payload };
        case 'SIGNUP_CONFIRMPASSWORD_CHANGE':
            return { ...state, signUpConfirmPassword: action.payload };
        case 'SIGNUP_CELLPHONE_CHANGE':
            return { ...state, signUpCellPhone: action.payload };
        case 'SIGNUP_RESIDENTIALPHONE_CHANGE':
            return { ...state, signUpResidentialPhone: action.payload };
        case 'SIGNUP_ADDRESS_CHANGE':
            return { ...state, signUpAddress: action.payload };
        case 'SIGNUP_STATE_CHANGE':
            return { ...state, signUpState: action.payload };
        case 'SIGNUP_USER_LATLONG_CHANGE':
            return { ...state, signUpLatLong: action.payload };
        case 'SIGNUP_PLAN_CHANGE':
            return { ...state, signUpPlan: action.payload };
        case 'SIGNUP_AP_NAME_CHANGE':
            return { ...state, signUpApName: action.payload };
        case 'SIGNUP_AP_EMAIL_CHANGE':
            return { ...state, signUpApEmail: action.payload };
        case 'SIGNUP_AP_CELLPHONE_CHANGE':
            return { ...state, signUpApCellPhone: action.payload };
        case 'SIGNUP_AP_RESIDENTIALPHONE_CHANGE':
            return { ...state, signUpApResidentialPhone: action.payload };
        case 'SIGNUP_PPAGREEMENTID_CHANGE':
            return { ...state, paypalAgreementId: action.payload };
        case 'SIGNUP_PPBILLINGDATE_CHANGE':
            return { ...state, paypalBillindDate: action.payload };
        case 'SIGNUP_PPEMAIL_CHANGE':
            return { ...state, paypalEmail: action.payload };
        case 'SIGNUP_PPNAME_CHANGE':
            return { ...state, paypalName: action.payload };
        case 'SIGNUP_PPPAYERID_CHANGE':
            return { ...state, paypalPayerdID: action.payload };
        case 'GET_PLAN_DATA':
            return { ...state, plansData: action.payload };
        case 'USER_LOGIN_CREATED':
            return { ...state, userFbId: action.payload };
        case 'GETPROBLEMLIST':
            return { ...state, problems: action.payload };
        case 'GETHOUSEAREAS':
            return { ...state, houseAreas: action.payload };
        case 'GETUSERREPORTS':
            return { ...state, reports: action.payload };
        case 'GETUSERREPORTSCOUNT':
            return { ...state, reportsCount: action.payload };
        case 'ALERT_DATAUPDATE':
            return { ...state, alertDataSuccess: action.payload };
        case 'RESET_SIGNUP_FORM':
            return initialState;    
        default:
            return state;
    }
};
