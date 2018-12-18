import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import firebase from 'firebase';
import { connect } from 'react-redux';
import {
    getProblemsListAct,
    getHouseAreasAct,
    getUserDataAct,
    getUserReportsAct
} from '../actions';

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.checkUserStatus();
        console.ignoredYellowBox = ['Setting a timer'];
    }

    checkUserStatus = async () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
                firebase
                    .database()
                    .ref(`users/${user.uid}`)
                    .once('value', snapshot => {
                        // console.log(snapshot.val());
                        if (snapshot.exists()) {
                            if (snapshot.val().status === 'active') {
                                this.props.getProblemsListAct();
                                this.props.getHouseAreasAct();
                                this.props.getUserDataAct(user.uid);
                                this.props.getUserReportsAct(user.uid);
                                this.props.navigation.navigate('DrawerStack');
                            } else {
                                this.props.navigation.navigate('LoginStack');
                            }
                        } else {
                            this.props.navigation.navigate('LoginStack');
                        }
                    });
            } else {
                this.props.navigation.navigate('LoginStack');
            }
        });
    };

    render() {
        return (
            <SafeAreaView style={style.safeArea}>
                <View>
                    <ActivityIndicator />
                </View>
            </SafeAreaView>
        );
    }
}

export default connect(
    '',
    {
        getProblemsListAct,
        getHouseAreasAct,
        getUserDataAct,
        getUserReportsAct
    }
)(AuthLoadingScreen);

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
