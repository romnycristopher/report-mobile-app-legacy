import React, { Component } from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as translation from '../config/lang.json';

class HeaderTitle extends Component {
    render() {
        const { appLanguage, section } = this.props;
        const txt = translation[appLanguage];

        if (section === 'profile') {
            return <Text style={style.title}>{txt.userProfile.headerTitle}</Text>;
        }

        return <Text style={style.title}>{txt.subscriptionView.headerTitle}</Text>;
    }
}

const mapStateToProps = state => {
    return {
        appLanguage: state.generalReducer.appLanguage
    };
};

const style = StyleSheet.create({
    title: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 17,
        fontWeight: '200'
    }
});

export default connect(mapStateToProps)(HeaderTitle);
