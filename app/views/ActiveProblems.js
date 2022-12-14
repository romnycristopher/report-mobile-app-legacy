import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import * as translation from '../config/lang.json';

const RenderItem = ({ navigation, itemData }) => {
    const fbDate = new Date(itemData.createdAt);
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
        timeOfDay = ' PM';
        const timeFormated = rawTimeSplited[0] - 12;
        time = `${timeFormated}:${rawTimeSplited[1]}`;
    } else {
        timeOfDay = ' AM';
        time = `${rawTimeSplited[0]}:${rawTimeSplited[1]}`;
    }

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('ReportDetails', {
                    reportDetailData: itemData
                })
            }
        >
            <View style={style.itemWrap}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 30 }}>
                        <Text style={style.headingText}>{`${time}${timeOfDay}`}</Text>
                        <Text style={style.subHeadingText}>{day}</Text>
                    </View>
                    <View>
                        <Text style={style.headingText}>{itemData.reportId}</Text>
                        <Text style={style.subHeadingText}>{itemData.problemType}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <View
                        style={itemData.status === 'open' ? style.statusRed : style.statusYellow}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
    // return <Text>Cool!</Text>;
};

// const title =

class ActiveProblems extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Active')
        };
    };

    constructor(props) {
        super(props);

        console.ignoredYellowBox = ['Setting a timer'];
    }

    componentWillMount() {
        const { appLanguage } = this.props;
        const txt = translation[appLanguage];
        this.props.navigation.setParams({ title: txt.activeReports.pageTitle });
    }

    render() {
        const { navigation, reports, appLanguage } = this.props;
        const txt = translation[appLanguage];

        //Transform Firebase Object to Array with UID inside for flatlist
        const dataForFlatlist = [];

        for (const [key, value] of Object.entries(reports)) {
            if (value.status === 'open' || value.status === 'working') {
                const data = value;
                data.uid = key;
                dataForFlatlist.push(data);
            }
        }

        const keyExtractor = item => item.uid;

        if (dataForFlatlist === undefined || dataForFlatlist.length === 0) {
            return (
                <SafeAreaView style={style.safeArea}>
                    <View style={style.noReportsWrap}>
                        <Text style={style.noReportsText}>{txt.activeReports.noreports}</Text>
                    </View>
                </SafeAreaView>
            );
        }

        return (
            <SafeAreaView style={style.safeArea}>
                <ScrollView>
                    <FlatList
                        data={dataForFlatlist}
                        keyExtractor={keyExtractor}
                        renderItem={({ item }) => (
                            <RenderItem navigation={navigation} itemData={item} />
                        )}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        appLanguage: state.generalReducer.appLanguage,
        reports: state.signUpReducer.reports
    };
};

export default connect(mapStateToProps)(ActiveProblems);

const style = StyleSheet.create({
    noReportsWrap: {
        flex: 1,
        // backgroundColor: '#F8F8F9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noReportsText: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 17
    },
    safeArea: {
        backgroundColor: '#fff',
        flex: 1
    },
    searchWrap: {
        backgroundColor: '#F8F8F9',
        height: 50
    },
    itemWrap: {
        borderBottomColor: '#F3F3F4',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 25,
        paddingTop: 25,
        paddingRight: 15,
        paddingLeft: 15
    },
    headingText: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 16,
        color: '#1D1D26'
    },
    subHeadingText: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 12,
        color: '#909190'
    },
    statusRed: {
        backgroundColor: '#F4313F',
        width: 10,
        height: 10,
        borderRadius: 25
    },
    statusYellow: {
        backgroundColor: '#F5A623',
        width: 10,
        height: 10,
        borderRadius: 25
    }
});
