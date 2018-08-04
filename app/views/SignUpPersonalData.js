import React, { Component } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { appLanguageAct } from '../actions';
// import FloatingLabelInput from '../components/FloatingLabelInputs';
import * as translation from '../config/lang.json';


class SignUpPersonalData extends Component {
    constructor(props) {
        super(props);
        
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    componentWillMount() {
        const { appLanguage } = this.props;
        const txt = translation[appLanguage];
        Actions.refresh({ title: txt.SignUpPersonalData.headerTitle });
    }

    changeLanguage() {
        this.props.appLanguageAct();
    }

    render() {      
        const { appLanguage } = this.props;
        const txt = translation[appLanguage];

        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View>
                    <TouchableOpacity
                        style={styles.loginForm_languageWrap}
                        onPress={this.changeLanguage}
                    >
                        <Text style={styles.loginForm_languageText}>
                            {txt.general.language}
                        </Text>
                    </TouchableOpacity>
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

export default connect(mapStateToProps, { appLanguageAct })(SignUpPersonalData);

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#fff',
        flex: 1,
    }
});
