import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import * as translation from '../config/lang.json';

const backImage = require('../assets/images/back.png');

class ReportDetails extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Report a Problem',
            headerMode: 'float',
            headerRight: null,
            headerLeft: (
                <View style={style.leftBtnWrap}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <Image source={backImage} style={style.backImage} />
                    </TouchableWithoutFeedback>
                </View>
            )
        };
    };

    constructor(props) {
        super(props);

        console.ignoredYellowBox = ['Setting a timer'];
    }

    //
    // ─── GET CLOSED TIME REPORT DETAILS ──────────────────────────────
    //
    renderTime(sentData) {
        const fbDate = new Date(sentData);
        const utc = fbDate.getTime() + fbDate.getTimezoneOffset();
        const isoDate = new Date(utc + 3600000 * -4).toISOString();
        const splitDate = isoDate.split('T');
        const day = splitDate[0];
        const timeToSplit = splitDate[1].split('.');
        const rawTime = timeToSplit[0];
        let time;
        let timeOfDay;

        const rawTimeSplited = rawTime.split(':');
        if (rawTimeSplited[0] > 12) {
            timeOfDay = 'PM';
            const timeFormated = rawTimeSplited[0] - 12;
            time = `${timeFormated}:${rawTimeSplited[1]}`;
        } else {
            timeOfDay = 'AM';
        }

        return `${time}${timeOfDay} - ${day}`;
    }


    renderClosedTime() {
        const reportDetailData = this.props.navigation.getParam('reportDetailData');

        if (reportDetailData.closedAt && !isNaN(reportDetailData.closedAt)) {
            return this.renderTime(reportDetailData.closedAt);
        }

        return '-';
    }

    
    renderOpenTime() {
        const reportDetailData = this.props.navigation.getParam('reportDetailData');

        if (reportDetailData.createdAt && !isNaN(reportDetailData.createdAt)) {   
            return this.renderTime(reportDetailData.createdAt);
        }

        return '-';
    }

    render() {
        const { appLanguage } = this.props;
        const txt = translation[appLanguage];
        const reportDetailData = this.props.navigation.getParam('reportDetailData');

        const reportInfoWrap = {};
        if (reportDetailData.status === 'open') {
            reportInfoWrap.backgroundColor = '#D0021B';
        } else if (reportDetailData.status === 'working') {
            reportInfoWrap.backgroundColor = '#F5A623';
        } else {
            reportInfoWrap.backgroundColor = '#909190';
        }

        return (
            <SafeAreaView style={style.safeArea}>
                <ScrollView>
                    <View style={reportInfoWrap}>
                        <View style={style.reportInfoItemWrap}>
                            <Text style={style.reportInfoHeading}>
                                {txt.reportDetail.reportStatus}
                            </Text>
                            <Text style={style.reportInfoContentField}>
                                {reportDetailData.status}
                            </Text>
                        </View>
                        <View style={style.reportInfoItemWrap}>
                            <Text style={style.reportInfoHeading}>{txt.reportDetail.reportID}</Text>
                            <Text style={style.reportInfoContentField}>
                                {reportDetailData.reportId}
                            </Text>
                        </View>
                        <View style={style.reportInfoItemWrap}>
                            <Text style={style.reportInfoHeading}>{txt.reportDetail.category}</Text>
                            <Text style={style.reportInfoContentField}>
                                {reportDetailData.problemCategory}
                            </Text>
                        </View>
                        <View style={style.reportInfoItemWrap}>
                            <Text style={style.reportInfoHeading}>{txt.reportDetail.problem}</Text>
                            <Text style={style.reportInfoContentField}>
                                {reportDetailData.problemType}
                            </Text>
                        </View>
                    </View>
                    <View style={style.reportInfoItemWrap}>
                        <Text style={style.fieldheading}>{txt.reportDetail.areaOfTheHouse}</Text>
                        <Text style={style.fieldContent}>{reportDetailData.houseArea}</Text>
                    </View>
                    <View style={[style.reportInfoItemWrap, { flexDirection: 'row' }]}>
                        <View style={{ marginRight: 40 }}>
                            <Text style={style.fieldheading}>{txt.reportDetail.opened}</Text>
                            <Text style={style.fieldContent}>{this.renderOpenTime()}</Text>
                        </View>
                        <View>
                            <Text style={style.fieldheading}>{txt.reportDetail.closed}</Text>
                            <Text style={style.fieldContent}>{this.renderClosedTime()}</Text>
                        </View>
                    </View>
                    <View style={style.reportInfoLastItemWrap}>
                        <Text style={style.fieldheading}>{txt.reportDetail.additionalComment}</Text>
                        <Text style={style.fieldContent}>{reportDetailData.additionalComment}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        appLanguage: state.generalReducer.appLanguage
    };
};

export default connect(mapStateToProps)(ReportDetails);

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    backImage: {
        width: 21,
        height: 21,
        marginLeft: 15
    },
    reportInfoWrapRed: {
        backgroundColor: '#D0021B'
    },
    reportInfoWrapYellow: {
        backgroundColor: '#F5A623'
    },
    reportInfoWrapGrey: {
        backgroundColor: '#909190'
    },
    reportInfoItemWrap: {
        borderBottomColor: '#00000010',
        borderBottomWidth: 1,
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 13,
        paddingBottom: 8
    },
    reportInfoLastItemWrap: {
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 13,
        paddingBottom: 8
    },
    reportInfoHeading: {
        color: '#ffffff75',
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 12
    },
    reportInfoContentField: {
        color: '#fff',
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 14
    },
    fieldheading: {
        color: '#959492',
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 12
    },
    fieldContent: {
        color: '#1D1D26',
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 14
    }
});
