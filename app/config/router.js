import { createStackNavigator } from 'react-navigation';
import LoginForm from '../views/LoginForm';
import ResetPassword from '../views/ResetPassword';
import SignUpPersonalData from '../views/SignUpPersonalData';
import MapSignUp from '../views/MapSignUp';
import PaypalWebview from '../views/PaypalWebview';

const RouterNav = createStackNavigator(
    {
        LoginForm,
        ResetPassword,
        SignUpPersonalData,
        MapSignUp,
        PaypalWebview
    },
    {
      initialRouteName: 'SignUpPersonalData',
      navigationOptions: {
        headerTitleStyle: {
              fontWeight: '300',
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
