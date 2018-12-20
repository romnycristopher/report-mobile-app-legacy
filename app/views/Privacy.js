import React, { Component } from 'react';
import {
    Image,
    WebView,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    View,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import HeaderTitle from '../components/HeaderTitle';

const menuIcon = require('../assets/images/menu_icon.png');

class Privacy extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderTitle section="privacy" />,
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomColor: '#fff'
            },
            headerTitleStyle: {
                fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
                fontSize: 17,
                fontWeight: '200'
            },
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
        };
    };

    constructor(props) {
        super(props);

        console.ignoredYellowBox = ['Setting a timer'];
    }

    render() {
        StatusBar.setBarStyle('dark-content', true);
        const urlToPay = 'https://aicoapp-dev.herokuapp.com/privacy';

        return (
            <SafeAreaView style={styles.safeAreaView}>
                <WebView source={{ uri: urlToPay }} />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        appLanguage: state.generalReducer.appLanguage
    };
};

export default connect(mapStateToProps)(Privacy);

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
    closeBtn: {
        width: 18,
        height: 18
    }
});
