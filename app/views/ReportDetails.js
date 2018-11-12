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
    renderClosedTime() {
        const reportDetailData = this.props.navigation.getParam('reportDetailData');

        if (reportDetailData.closedAt) {
            const closedDate = new Date(reportDetailData.closedAt).toLocaleString();
            const closedDateSplit = closedDate.split(',');
            const closedHourTime = closedDateSplit[1].slice(0, -6).trim();
            let closedMeridiem = '';
            if (closedDateSplit[1].length <= 11) {
                closedMeridiem = closedDateSplit[1].slice(9, 11);
            } else {
                closedMeridiem = closedDateSplit[1].slice(10, 12);
            }

            return `${closedHourTime}${closedMeridiem} - ${closedDateSplit[0].trim()}`;
        }

        return '-';
    }

    renderOpenTime() {
        const reportDetailData = this.props.navigation.getParam('reportDetailData');

        if (reportDetailData.createdAt) {
            const myDate = new Date(reportDetailData.createdAt).toLocaleString();
            const myDateSplit = myDate.split(',');
            const hourTime = myDateSplit[1].slice(0, -6).trim();
            let openMeridiem = '';
            if (myDateSplit[1].length <= 11) {
                openMeridiem = myDateSplit[1].slice(9, 11);
            } else {
                openMeridiem = myDateSplit[1].slice(10, 12);
            }

            return `${hourTime}${openMeridiem} - ${myDateSplit[0].trim()}`;
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
