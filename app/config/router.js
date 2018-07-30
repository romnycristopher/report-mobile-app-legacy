import { createStackNavigator } from 'react-navigation';

//Routes
import LoginForm from '../views/LoginForm';

export const Navigator = createStackNavigator(
    {
        Home: LoginForm,
    },
    {
        initialRouteName: 'Home'
    }
);
