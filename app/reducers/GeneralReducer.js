const initialState = {
    appLanguage: 'en',
    loggedIn: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            return { appLanguage: state.appLanguage === 'en' ? 'es' : 'en' };  
        default:
            return state;
    }
};
