import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

export const FixedButton = ({ onPress, text }) => {
    const { buttonStyle, buttonText } = styles;
    
    return (
        <TouchableHighlight 
            style={buttonStyle}
            onPress={onPress}
        >
            <View>
                <Text style={buttonText}>
                    {text}
                </Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#F4313F',
        paddingTop: 20,
        paddingBottom: 20
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 17,
    }
});
