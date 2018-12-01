//
// ──────────────────────────────────────────────────── I ──────────
//   :::::: I M P O R T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

//
// ─── LIBRARIES ──────────────────────────────────────────────────────────────────
//
import React from 'react';
import { View, TouchableWithoutFeedback, Image, Platform } from 'react-native';
import {
    createStackNavigator,
    createDrawerNavigator,
    createMaterialTopTabNavigator,
    createSwitchNavigator
} from 'react-navigation';

//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//
import LoginForm from '../views/LoginForm';
import ResetPassword from '../views/ResetPassword';
import SignUpPersonalData from '../views/SignUpPersonalData';
import MapSignUp from '../views/MapSignUp';
import PaypalWebview from '../views/PaypalWebview';
import Dashboard from '../views/Dashboard';
import Subscription from '../views/Subscription';
import ReportCreate from '../views/ReportCreate';
import ReportDetails from '../views/ReportDetails';
import UserProfile from '../views/UserProfile';
import MapUpdate from '../views/MapUpdate';
import SideMenu from '../components/SideMenu';
import ActiveProblems from '../views/ActiveProblems';
import ArchivedProblems from '../views/ArchivedProblems';
import AuthLoadingScreen from '../views/AuthLoadingScreen';

import CreateReportBtn from '../components/CreateReportBtn';
import ReportsTitle from '../components/ReportsTitle';

const menuIcon = require('../assets/images/menu_icon.png');

//
// ──────────────────────────────────────────────────────────── II ──────────
//   :::::: N A V I G A T O R S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────
//
const TabNavs = createMaterialTopTabNavigator(
    {
        ActiveProblems: { screen: ActiveProblems },
        ArchivedProblems: { screen: ArchivedProblems }
    },
    {
        initialRouteName: 'ActiveProblems',
        tabBarOptions: {
            labelStyle: {
                fontSize: 11,
                fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
                color: '#1D1D26'
            },
            indicatorStyle: {
                backgroundColor: '#F4313F'
            },
            style: {
                backgroundColor: '#fff'
            }
        }
    }
);

const ReportStack = createStackNavigator(
    {
        TabNavs: { screen: TabNavs },
        ReportCreate: { screen: ReportCreate },
        ReportDetails: { screen: ReportDetails }
    },
    {
        initialRouteName: 'TabNavs',
        navigationOptions: ({ navigation }) => ({
            headerTitle: <ReportsTitle />,
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomColor: '#fff'
            },
            headerTitleStyle: {
                fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
                fontSize: 17,
                fontWeight: '200'
            },
            headerRight: <CreateReportBtn />,
            headerLeft: (
                <View
                    style={{
                        left: 15,
                        top: -3,
                        paddingRight: 16
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                        <Image source={menuIcon} style={{ width: 20, height: 17 }} />
                    </TouchableWithoutFeedback>
                </View>
            )
        })
    }
);

const UserProfileStack = createStackNavigator(
    {
        UserProfile: { screen: UserProfile },
        MapUpdate: { screen: MapUpdate }
    },
    {
        initialRouteName: 'UserProfile'
    }
);

const SubscriptionStack = createStackNavigator({
    Subscription: { screen: Subscription }
});

const DrawerStack = createDrawerNavigator(
    {
        Dashboard: { screen: Dashboard },
        ReportStack: { screen: ReportStack },
        SubscriptionStack: { screen: SubscriptionStack },
        UserProfileStack: { screen: UserProfileStack }
    },
    {
        initialRouteName: 'Dashboard',
        contentComponent: SideMenu
    }
);

const LoginStack = createStackNavigator(
    {
        LoginForm: { screen: LoginForm },
        ResetPassword: { screen: ResetPassword },
        SignUpPersonalData: { screen: SignUpPersonalData },
        MapSignUp: { screen: MapSignUp },
        PaypalWebview: { screen: PaypalWebview }
    },
    {
        initialRouteName: 'LoginForm',
        navigationOptions: {
            headerTitleStyle: {
                fontWeight: '300',
                fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
                color: '#1D1D26'
            },
            headerStyle: {
                backgroundColor: '#fff'
            }
        }
    }
);

const RouterNav = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        LoginStack: { screen: LoginStack },
        DrawerStack: { screen: DrawerStack }
    },
    {
        initialRouteName: 'AuthLoading'
    }
);

export default RouterNav;
