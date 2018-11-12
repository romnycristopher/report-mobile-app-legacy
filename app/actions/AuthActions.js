import firebase from 'firebase';
import NavigationService from '../config/NavigationService';
import {
    getUserReportsAct,
    getProblemsListAct,
    getHouseAreasAct,
    getUserDataAct
} from '../actions';

export const emailChangeAct = email => {
    return {
        type: 'EMAIL_CHANGE',
        payload: email
    };
};

export const resetPasswordEmailAct = resetEmail => {
    return {
        type: 'RESET_PASSWORD_EMAIL_CHANGE',
        payload: resetEmail
    };
};

export const passwordChangeAct = password => {
    return {
        type: 'PASSWORD_CHANGE',
        payload: password
    };
};

export const loginUserAct = ({ email, password }) => {
    return dispatch => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({ type: 'USER_LOGIN_SUCESS', payload: user });
                // console.log(user.user.uid);
                dispatch(getProblemsListAct());
                dispatch(getHouseAreasAct());
                dispatch(getUserDataAct(user.user.uid));
                dispatch(getUserReportsAct(user.user.uid));
                NavigationService.navigate('DrawerStack');
            })
            .catch(error => {
                dispatch({ type: 'USER_LOGIN_FAIL', payload: error });
            });
    };
};

export const logOutUserAct = () => {
    return () => {
        firebase
            .auth()
            .signOut()
            .catch(error => {
                console.log(error);
            });
    };
};

export const loginFormResetErrorAct = () => {
    return {
        type: 'USER_LOGIN_RESET_FORM',
        payload: ''
    };
};
