import { combineReducers } from 'redux';
import authRed from './AuthReducer';
import generalRed from './GeneralReducer';

export default combineReducers({
    authReducer: authRed,
    generalReducer: generalRed
});
