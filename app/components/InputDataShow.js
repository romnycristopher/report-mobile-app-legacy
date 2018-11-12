import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, Platform } from 'react-native';

export default class InputDataShow extends Component {
    render() {
        const { label, noChange, ...props } = this.props;

        const labeStyle = {
            position: 'absolute',
            left: 20,
            top: 15,
            fontSize: 12,
            color: '#959492',
            fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
        };

        return (
            <View
                style={[
                    styles.componentWrap,
                    { backgroundColor: noChange ? '#F3F3F4' : 'rgba(255, 255, 255, 0)' }
                ]}
            >
                <Text style={labeStyle}>{label}</Text>
                <TextInput
                    {...props}
                    style={styles.textInput}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    underlineColorAndroid={'transparent'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    componentWrap: {
        paddingTop: 35,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomColor: '#F3F3F4',
        borderBottomWidth: 1
    },
    textInput: {
        marginTop: -3,
        fontSize: 14,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        color: '#1D1D26'
    }
});
