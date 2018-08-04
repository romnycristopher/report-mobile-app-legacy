import { createStackNavigator } from 'react-navigation';
import LoginForm from '../views/LoginForm';
import ResetPassword from '../views/ResetPassword';
import SignUpPersonalData from '../views/SignUpPersonalData';

const RouterNav = createStackNavigator(
    {
        LoginForm,
        ResetPassword,
        SignUpPersonalData
    },
    {
      initialRouteName: 'LoginForm',
      navigationOptions: {
        headerTitleStyle: {
              fontWeight: 'normal',
              fontFamily: 'Avenir',
              color: '#1D1D26'
        },
        headerStyle: {
            backgroundColor: '#fff'
        }
      }
    }
);

export default RouterNav;
