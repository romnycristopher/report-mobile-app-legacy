import React, { Component } from 'react';
import { Image, WebView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

const backBtnImage = require('../assets/images/back.png');

class PaypalWebview extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
          headerBackTitle: false,
          title: navigation.getParam('title', 'Subscription'),
          headerBackImage: <Image style={styles.backBtn} source={backBtnImage} />
        };
    };

    constructor(props) {
        super(props);

        console.ignoredYellowBox = ['Setting a timer'];
    }


    render() {
        const { signUpPlan, userFbId, appLanguage } = this.props;
        
        const urlToPay = `https://aicoapp-dev.herokuapp.com/?planprice=${signUpPlan.planPrice}&planvisits=${signUpPlan.planVisits}&plancalls=${signUpPlan.planCalls}&applanguage=${appLanguage}&userid=${userFbId}`;
        // const urlToPay = `http://localhost:3000/?planprice=${signUpPlan.planPrice}&planvisits=${signUpPlan.planVisits}&plancalls=${signUpPlan.planCalls}&applanguage=${appLanguage}&userid=${userFbId}`;
    

        return (
            <SafeAreaView style={styles.safeAreaView}>
                <WebView
                    source={{ uri: urlToPay }}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    const { signUpPlan, userFbId } = state.signUpReducer;
    

    return { 
        signUpPlan, 
        userFbId,
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
        width: 21,
        height: 21,
        marginLeft: 15
    }
});
