import React, { Component } from 'react';
import { Image, WebView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
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

    onMessage(message) {
        //Prints out data that was passed from.
        console.log(JSON.parse(message.nativeEvent.data));
        // console.log(message);
    }

    render() {
        const { signUpPlan, appLanguage } = this.props;
        // console.log(signUpPlan);
        // console.log('WebView');
        
        
        // const urlToPay = `https://aicoapp-dev.herokuapp.com/?planprice=${signUpPlan.planPrice}&planvisits=${signUpPlan.planVisits}&plancalls=${signUpPlan.planCalls}&applanguage=${appLanguage}`;
        const urlToPay = `http://localhost:5000/?planprice=${signUpPlan.planPrice}&planvisits=${signUpPlan.planVisits}&plancalls=${signUpPlan.planCalls}&applanguage=${appLanguage}`;

        return (
            <SafeAreaView style={styles.safeAreaView}>
                <WebView
                    ref='webview'
                    onMessage={this.onMessage}
                    source={{ uri: urlToPay }}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    const { signUpPlan } = state.signUpReducer;
    

    return { 
        signUpPlan, 
        appLanguage: state.generalReducer.appLanguage 
    };
};

export default connect(mapStateToProps)(PaypalWebview);

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
