import React, { Component } from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as translation from '../config/lang.json';

class ReportsTitle extends Component {
    render() {
        const { appLanguage } = this.props;
        const txt = translation[appLanguage];

        return (
            <Text style={styles.title}>{txt.reportsView.title}</Text>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 17,
        fontWeight: '200'
    }
});

const mapStateToProps = state => {
    return {
        appLanguage: state.generalReducer.appLanguage
    };
};

export default connect(mapStateToProps)(ReportsTitle);
