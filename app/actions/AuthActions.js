export const emailChangeAct = email => {
    return {
        type: 'EMAIL_CHANGE',
        payload: email
    };
};

export const resetPasswordAct = email => {
    return {
        type: 'RESET_PASSWORD',
        payload: email
    };
};

export const passwordChangeAct = password => {
    return {
        type: 'PASSWORD_CHANGE',
        payload: password
    };
};
