import React, { Component } from 'react';
import { Image, WebView, StyleSheet } from 'react-native';
// import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

const backBtnImage = require('../assets/images/backBtn.png');

class PaypalWebview extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          headerBackTitle: false,
          title: navigation.getParam('title', 'Subscription'),
          headerBackImage: <Image style={styles.backBtn} source={backBtnImage} />
        };
    };

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <WebView
                    source={{ uri: 'http://localhost:5000/' }}
                />
            </SafeAreaView>
        );
    }
}

export default PaypalWebview;

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
    backBtn: {
        width: 7,
        height: 18,
        marginLeft: 15
    }
});
