import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

export const FixedButton = ({ onPress, text }) => {
    const { buttonStyle, buttonText, buttonWrap } = styles;
    
    return (
        <View style={buttonWrap}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    buttonWrap: {
        backgroundColor: '#F4313F',
        ...ifIphoneX({
            paddingBottom: 30,
            marginBottom: -40
        })
    },
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
