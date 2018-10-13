const initialState = {
    email: '',
    password: '',
    resetEmail: '',
    user: '',
    signUpError: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'EMAIL_CHANGE':
            return { ...state, email: action.payload };  
        case 'PASSWORD_CHANGE':
            return { ...state, password: action.payload };
        case 'RESET_PASSWORD_EMAIL_CHANGE':
            return { ...state, resetEmail: action.payload };          
        case 'USER_LOGIN_SUCESS':
            return { ...state, user: action.payload };
        case 'USER_LOGIN_FAIL':
            return { ...state, signUpError: action.payload };
        case 'USER_LOGIN_RESET_FORM':
            return { ...state, signUpError: '' };    
        default:
            return state;

    }
};
