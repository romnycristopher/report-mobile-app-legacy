//
// ────────────────────────────────────────────────────── I ──────────
//   :::::: I M P O R T S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Image,
    Modal,
    TouchableHighlight,
    Alert,
    Platform
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    changeProblemCategoryAct,
    changeProblemTypeAct,
    changeHouseAreaAct,
    changeAdditionalCommentAct,
    reportProblemAct,
    resetReportFormAct,
    reportModalAct
} from '../actions';
import { FixedButton } from '../components/FixedButton';
import * as translation from '../config/lang.json';

//
// ─── ASSET ──────────────────────────────────────────────────────────────────────
//
const backImage = require('../assets/images/back.png');
const closeBtn = require('../assets/images/close-btn.png');

//
// ────────────────────────────────────────────────────────── II ──────────
//   :::::: C O M P O N E N T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
//
class CreateReport extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Report a Problem'),
            headerMode: 'float',
            headerRight: null,
            headerLeft: (
                <View
                    style={{
                        left: 0,
                        top: -3,
                        paddingRight: 16
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <Image source={backImage} style={style.backImage} />
                    </TouchableWithoutFeedback>
                </View>
            )
        };
    };

    constructor(props) {
        super(props);
        this.onAdditionCommentChange = this.onAdditionCommentChange.bind(this);
        this.onCreateReport = this.onCreateReport.bind(this);

        console.ignoredYellowBox = ['Setting a timer'];
    }

    state = {
        modalProblemType: false,
        modalHouseArea: false,
        modalProblemCategory: false,
        problemCategory: ''
    };

    componentWillMount() {
        this.props.resetReportFormAct();

        if (this.props.navigation.getParam('problemType')) {
            const problemCategory = this.props.navigation.getParam('problemType');
            const { appLanguage } = this.props;
            const txt = translation[appLanguage];

            let textToReturn = '';
            if (problemCategory === 'wifi_internet') {
                textToReturn = txt.dashboard.reportBtnInternetTitle;
            } else if (problemCategory === 'audio_video') {
                textToReturn = txt.dashboard.reportBtnAudioTitle;
            } else if (problemCategory === 'security') {
                textToReturn = txt.dashboard.reportBtnSecurityTitle;
            }

            this.setState({ problemCategory });
            this.props.changeProblemCategoryAct(textToReturn);
        }
    }

    componentDidUpdate() {
        const { reportModal, navigation, appLanguage } = this.props;
        const txt = translation[appLanguage];

        if (reportModal) {
            Alert.alert(
                txt.reportCreate.reportCreatedTitle,
                txt.reportCreate.reportCreatedDescription,
                [
                    {
                        text: txt.reportCreate.reportCreatedBtnTxt,
                        onPress: () => {
                            this.props.reportModalAct(false);
                            setTimeout(() => {
                                navigation.goBack();
                            }, 300);
                        }
                    }
                ],
                { cancelable: false }
            );
        }
    }

    onAdditionCommentChange(text) {
        this.props.changeAdditionalCommentAct(text);
    }

    onCreateReport() {
        const {
            userFbId,
            problemCatToReport,
            problemTypeToReport,
            houseAreaToReport,
            additionalCommentToReport
        } = this.props;
        this.props.reportProblemAct({
            problemCatToReport,
            problemTypeToReport,
            houseAreaToReport,
            additionalCommentToReport,
            userFbId
        });
    }

    renderProblemTypeList() {
        const { problems, appLanguage } = this.props;
        if (problems !== undefined && problems.length !== 0) {
            const problemCategory = this.state.problemCategory;
            const problemTypeObj = problems[appLanguage][problemCategory];

            const problemTypeArray = _.map(problemTypeObj, (val, i) => {
                return (
                    <TouchableOpacity
                        key={i}
                        onPress={() => {
                            this.props.changeProblemTypeAct(val.problem);
                            this.setState({ modalProblemType: false });
                        }}
                    >
                        <View style={style.modalItem}>
                            <Text style={style.modalItemText}>{val.problem}</Text>
                        </View>
                    </TouchableOpacity>
                );
            });

            return problemTypeArray;
        }
    }

    renderHouseAreaList() {
        const { houseAreas, appLanguage } = this.props;
        if (houseAreas !== undefined && houseAreas.length !== 0) {
            const houseAreasArray = _.map(houseAreas[appLanguage], (val, i) => {
                return (
                    <TouchableOpacity
                        key={i}
                        onPress={() => {
                            this.props.changeHouseAreaAct(val.houseArea);
                            this.setState({ modalHouseArea: false });
                        }}
                    >
                        <View style={style.modalItem}>
                            <Text style={style.modalItemText}>{val.houseArea}</Text>
                        </View>
                    </TouchableOpacity>
                );
            });

            return houseAreasArray;
        }
    }

    render() {
        const {
            appLanguage,
            problemCatToReport,
            problemTypeToReport,
            houseAreaToReport,
            additionalCommentToReport
        } = this.props;
        const txt = translation[appLanguage];

        return (
            <SafeAreaView style={style.safeArea}>
                <KeyboardAwareScrollView style={{ flex: 1 }}>
                    <View style={style.pageIntro}>
                        <Text style={style.pageIntroTitle}>{txt.reportCreate.sectionTitle}</Text>
                        <Text style={style.pageIntroSubtitle}>
                            {txt.reportCreate.sectionSubTitle}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.setState({ modalProblemCategory: true })}
                        style={style.textHeadingWrap}
                    >
                        <View style={style.textHeadingWrapInner}>
                            <Text style={style.textSubHeading}>
                                {txt.reportCreate.categoryLabel}
                            </Text>
                            <Text style={style.textHeading}>{problemCatToReport}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({ modalProblemType: true })}
                        style={style.textHeadingWrap}
                    >
                        <View style={style.textHeadingWrapInner}>
                            <Text style={style.textSubHeading}>
                                {txt.reportCreate.problemLabel}
                            </Text>
                            <Text style={style.textHeading}>{problemTypeToReport}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({ modalHouseArea: true })}
                        style={style.textHeadingWrap}
                    >
                        <View style={style.textHeadingWrapInner}>
                            <Text style={style.textSubHeading}>{txt.reportCreate.house_area}</Text>
                            <Text style={style.textHeading}>{houseAreaToReport}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={style.textareaHeadingWrap}>
                        <View style={style.textHeadingWrapInner}>
                            <TextInput
                                style={style.textArea}
                                placeholder={txt.reportCreate.additionalCommLabel}
                                multiline
                                value={additionalCommentToReport}
                                onChangeText={this.onAdditionCommentChange}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>

                <FixedButton
                    text={txt.reportCreate.createReportBtn}
                    onPress={this.onCreateReport}
                />

                <Modal
                    animationType="slide"
                    transparent
                    visible={this.state.modalProblemType}
                    onRequestClose={() => {}}
                >
                    <View style={style.modalContainer}>
                        <View style={style.modalStyle}>
                            <View style={style.modalHeader}>
                                <View style={style.closeModal}>
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setState({ modalProblemType: false });
                                        }}
                                    >
                                        <Image source={closeBtn} style={style.closeBtn} />
                                    </TouchableHighlight>
                                </View>
                                <Text style={style.modalTitle}>
                                    {txt.reportCreate.reportProblemLabel}
                                </Text>
                            </View>
                            <View style={style.modalDescriptionWrap}>
                                <Text style={style.modalDescriptionText}>
                                    {txt.reportCreate.reportProblemDescription}
                                </Text>
                            </View>
                            <View>
                                <ScrollView>{this.renderProblemTypeList()}</ScrollView>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent
                    visible={this.state.modalHouseArea}
                    onRequestClose={() => {}}
                >
                    <View style={style.modalContainer}>
                        <View style={style.modalStyle}>
                            <View style={style.modalHeader}>
                                <View style={style.closeModal}>
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setState({ modalHouseArea: false });
                                        }}
                                    >
                                        <Image source={closeBtn} style={style.closeBtn} />
                                    </TouchableHighlight>
                                </View>
                                <Text style={style.modalTitle}>
                                    {txt.reportCreate.reportHouseLabel}
                                </Text>
                            </View>
                            <View style={style.modalDescriptionWrap}>
                                <Text style={style.modalDescriptionText}>
                                    {txt.reportCreate.reportHouseDescription}
                                </Text>
                            </View>
                            <View>
                                <ScrollView style={{ height: 400 }}>
                                    {this.renderHouseAreaList()}
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent
                    visible={this.state.modalProblemCategory}
                    onRequestClose={() => {}}
                >
                    <View style={style.modalContainer}>
                        <View style={style.modalStyle}>
                            <View style={style.modalHeader}>
                                <View style={style.closeModal}>
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setState({ modalProblemCategory: false });
                                        }}
                                    >
                                        <Image source={closeBtn} style={style.closeBtn} />
                                    </TouchableHighlight>
                                </View>
                                <Text style={style.modalTitle}>
                                    {txt.reportCreate.reportProblemTypeLabel}
                                </Text>
                            </View>
                            <View style={style.modalDescriptionWrap}>
                                <Text style={style.modalDescriptionText}>
                                    {txt.reportCreate.reportProblemTypeDescription}
                                </Text>
                            </View>
                            <View>
                                <ScrollView>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ problemCategory: 'wifi_internet' });
                                            this.renderProblemTypeList();
                                            this.props.changeProblemCategoryAct(
                                                txt.dashboard.reportBtnInternetTitle
                                            );
                                            this.setState({ modalProblemCategory: false });
                                        }}
                                    >
                                        <View style={style.modalItem}>
                                            <Text style={style.modalItemText}>
                                                {txt.dashboard.reportBtnInternetTitle}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ problemCategory: 'audio_video' });
                                            this.renderProblemTypeList();
                                            this.props.changeProblemCategoryAct(
                                                txt.dashboard.reportBtnAudioTitle
                                            );
                                            this.setState({ modalProblemCategory: false });
                                        }}
                                    >
                                        <View style={style.modalItem}>
                                            <Text style={style.modalItemText}>
                                                {txt.dashboard.reportBtnAudioTitle}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ problemCategory: 'security' });
                                            this.renderProblemTypeList();
                                            this.props.changeProblemCategoryAct(
                                                txt.dashboard.reportBtnSecurityTitle
                                            );
                                            this.setState({ modalProblemCategory: false });
                                        }}
                                    >
                                        <View style={style.modalItem}>
                                            <Text style={style.modalItemText}>
                                                {txt.dashboard.reportBtnSecurityTitle}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        appLanguage: state.generalReducer.appLanguage,
        problems: state.signUpReducer.problems,
        userFbId: state.signUpReducer.userFbId,
        houseAreas: state.signUpReducer.houseAreas,
        problemCatToReport: state.ReportProblemReducer.problemCatToReport,
        problemTypeToReport: state.ReportProblemReducer.problemTypeToReport,
        houseAreaToReport: state.ReportProblemReducer.houseAreaToReport,
        additionalCommentToReport: state.ReportProblemReducer.additionalCommentToReport,
        reportModal: state.ReportProblemReducer.reportModal
    };
};

export default connect(
    mapStateToProps,
    {
        changeProblemCategoryAct,
        changeProblemTypeAct,
        changeHouseAreaAct,
        changeAdditionalCommentAct,
        reportProblemAct,
        resetReportFormAct,
        reportModalAct
    }
)(CreateReport);

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    modalContainer: {
        backgroundColor: '#00000080',
        flex: 1,
        justifyContent: 'center',
        paddingRight: 15,
        paddingLeft: 15
    },
    modalOkBtn: {
        backgroundColor: '#2C2A25',
        paddingBottom: 20,
        paddingTop: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },
    modalOkBtnTxt: {
        color: '#fff',
        fontSize: 17,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
    },
    modalStyle: {
        backgroundColor: '#fff',
        borderRadius: 3
    },
    modalHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 46
    },
    closeModal: {
        position: 'absolute',
        left: 10
    },
    modalDescriptionWrap: {
        backgroundColor: '#F8F8F9',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 15,
        paddingLeft: 15
    },
    modalDescriptionText: {
        fontSize: 13,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        textAlign: 'center'
    },
    modalItem: {
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F4'
    },
    modalItemText: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 14,
        textAlign: 'center'
    },
    modalTitle: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 17,
        fontWeight: '200'
    },
    closeBtn: {
        width: 18,
        height: 18
    },
    textHeadingWrapInner: {
        paddingRight: 15,
        paddingLeft: 15
    },
    textHeadingWrap: {
        paddingTop: 20,
        paddingBottom: 10,
        borderBottomColor: '#F3F3F4',
        borderBottomWidth: 1
    },
    textareaHeadingWrap: {
        paddingTop: 20,
        paddingBottom: 10
    },
    textSubHeading: {
        fontSize: 12,
        color: '#959492',
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
    },
    textArea: {
        fontSize: 14,
        color: '#2C2A25',
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        marginBottom: 20
    },
    textHeading: {
        fontSize: 14,
        color: '#2C2A25',
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
    },
    backImage: {
        width: 21,
        height: 21,
        left: 15
    },
    pageIntro: {
        height: 150,
        backgroundColor: '#F8F8F9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageIntroTitle: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontWeight: '200',
        fontSize: 30,
        color: '#1D1D26'
    },
    pageIntroSubtitle: {
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        fontSize: 13,
        color: '#1D1D26',
        width: 300,
        textAlign: 'center'
    }
});
