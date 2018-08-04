import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

//COMPONENTS
import LoginForm from '../views/LoginForm';
import ResetPassword from '../views/ResetPassword';
import SignUpPersonalData from '../views/SignUpPersonalData';

//Images
const closeBtnImage = require('../assets/images/close-btn.png');

const RouterComponent = (state) => {
    
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
                    getTitle={state}
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

export default RouterComponent;
