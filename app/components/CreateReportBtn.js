import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import NavigationService from '../config/NavigationService';
import * as translation from '../config/lang.json';

const plusIcon = require('../assets/images/plusIcon.png');

class CreateReportBtn extends Component {
    render() {
        const { appLanguage } = this.props;
        const txt = translation[appLanguage];

        return (
            <View style={{ right: 15, top: -3 }}>
                <TouchableWithoutFeedback
                    onPress={() =>
                        NavigationService.navigate('ReportCreate', {
                            title: txt.reportCreate.title
                        })
                    }
                >
                    <Image source={plusIcon} style={{ width: 21, height: 21 }} />
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        appLanguage: state.generalReducer.appLanguage
    };
};

export default connect(mapStateToProps)(CreateReportBtn);
