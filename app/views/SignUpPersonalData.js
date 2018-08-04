import React, { Component } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    // TouchableHighlight,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

class SignUpPersonalData extends Component {
    render() {       
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View>
                    <Text>Hello</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        appLanguage: state.generalReducer.appLanguage,
    };
};

export default connect(mapStateToProps)(SignUpPersonalData);

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#fff',
        flex: 1,
    }
});
