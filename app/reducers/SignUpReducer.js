const initialState = {
    signUpName: '',
    signUpEmail: '',
    signUpPassword: '',
    signUpConfirmPassword: '',
    signUpCellPhone: '',
    signUpResidentialPhone: '',
    signUpAddress: '',
    signUpPlan: '',
    signUpApName: '',
    signUpApEmail: '',
    signUpApCellPhone: '',
    signUpApResidentialPhone: '',
    signUpLatLong: {
        latitude: 18.471447,
        longitude: -69.918200,
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};
