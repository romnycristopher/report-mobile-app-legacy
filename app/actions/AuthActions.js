import firebase from 'firebase';

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

export const resetPasswordAct = resetEmail => {
    return (dispatch) => {
        firebase.auth().languageCode = 'es';
        firebase.auth().sendPasswordResetEmail(resetEmail).then(() => {
            // Email sent.
            console.log('Email sent');
          }).catch((error) => {
            // An error happened.
            console.log(error);
            dispatch({ type: 'USER_LOGIN_FAIL', payload: error });
          });
    };
};

export const passwordChangeAct = password => {
    return {
        type: 'PASSWORD_CHANGE',
        payload: password
    };
};

export const loginUserAct = ({ email, password }) => {
    return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch({ type: 'USER_LOGIN_SUCESS', payload: user });
        })
        .catch((error) => {
            dispatch({ type: 'USER_LOGIN_FAIL', payload: error });
        });
    };
};

export const loginFormResetErrorAct = () => {
    return {
        type: 'USER_LOGIN_RESET_FORM',
        payload: ''
    };
};
