import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import generalReducer from './GeneralReducer';
import signUpReducer from './SignUpReducer';

export default combineReducers({
    authReducer,
    generalReducer,
    signUpReducer
});
