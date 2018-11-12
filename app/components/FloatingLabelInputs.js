import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Animated, Platform } from 'react-native';

export default class FloatingLabelInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false
        };
    }

    componentWillMount() {
        this.animatedIsFocused = new Animated.Value(0);
    }

    componentDidUpdate() {
        Animated.timing(this.animatedIsFocused, {
          toValue: (this.state.isFocused || this.props.value !== '' ? 1 : 0),
          duration: 200,
        }).start();
    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    render() {
        const { label, secondStyle, ...props } = this.props;
       
        const labeStyle = {
            position: 'absolute',
            fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
            left: 20,
            top: this.animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [33, 15],
            }),
            fontSize: this.animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 12],
            }),
            color: this.animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [
                    (secondStyle ? 'rgba(255, 255, 255, 1.0)' : 'rgba(0, 0, 0, 1.0)'), 
                    (secondStyle ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.5)')
                ],
            })
        };

        return (
            <View 
                style={
                    [styles.componentWrap, { 
                        borderBottomColor: (secondStyle ? 'rgba(255, 255, 255, 0.20)' : '#F3F3F4'),
                    }]
                }
            >
                <Animated.Text style={labeStyle}>
                    {label}
                </Animated.Text>
                <TextInput
                    {...props}
                    style={[styles.textInput, { color: (secondStyle ? '#fff' : '#1D1D26') }]}
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
        backgroundColor: 'rgba(255, 255, 255, 0.20)',
        borderBottomColor: 'rgba(255, 255, 255, 0.20)',
        borderBottomWidth: 1
    },
    textInput: {
        marginTop: -3,
        fontSize: 14, 
        color: '#fff', 
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
    }
});
