import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';

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
        const { label, ...props } = this.props;
        const labeStyle = {
            position: 'absolute',
            left: 20,
            top: this.animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [33, 13],
            }),
            fontSize: this.animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 12],
            }),
            color: this.animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(255, 255, 255, 1.0)', 'rgba(255, 255, 255, 0.75)'],
            })
        };

        return (
            <View style={styles.componentWrap}>
                <Animated.Text style={labeStyle}>
                    {label}
                </Animated.Text>
                <TextInput
                    {...props}
                    style={styles.textInput}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
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
        height: 14, 
        fontSize: 14, 
        color: '#fff', 
    }
});
