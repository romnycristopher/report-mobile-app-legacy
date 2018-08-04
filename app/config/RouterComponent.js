import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

//COMPONENTS
import LoginForm from '../views/LoginForm';
import ResetPassword from '../views/ResetPassword';
import SignUpPersonalData from '../views/SignUpPersonalData';
import * as translation from '../config/lang.json';

//Images
const closeBtnImage = require('../assets/images/close-btn.png');

const RouterComponent = (state) => {
    const { appLanguage } = state;
    const txt = translation[appLanguage];
    
    return (
        <Router>
            <Scene key='root' hideNavBar>
                <Scene key='auth' hideNavBar>
                    <Scene key='LoginForm' initial component={LoginForm} />
                    <Scene key='ResetPassword' component={ResetPassword} />
                </Scene>
                <Scene key='signUpScene'>
                    <Scene 
                    leftButtonImage={closeBtnImage}
                    leftButtonIconStyle={styles.closeBtn}
                    onLeft={() => Actions.pop()}
                    key='SignUpPersonalData' component={SignUpPersonalData} 
                    title={txt.SignUpPersonalData.headerTitle}
                    titleStyle={styles.titleStyle}
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

const styles = {
    closeBtn: {
        width: 18,
        height: 18
    },
    titleStyle: {
        fontWeight: 'normal',
        letterSpacing: 0.5,
        fontFamily: 'Avenir',
    }
};

const mapStateToProps = state => {
    return {
        appLanguage: state.generalReducer.appLanguage
    }; 
};

export default connect(mapStateToProps)(RouterComponent);
