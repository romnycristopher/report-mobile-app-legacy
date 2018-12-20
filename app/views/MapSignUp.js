import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { Location, Permissions, MapView } from 'expo';
import { signUpLatLongChangeAct, createPAYGUserAct, createPaidUserAct } from '../actions';
import { FixedButton } from '../components/FixedButton';
import * as translation from '../config/lang.json';

const backBtnImage = require('../assets/images/back.png');

class MapSignUp extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerBackTitle: null,
            title: navigation.getParam('title', 'Map Location'),
            headerBackImage: <Image style={styles.backBtn} source={backBtnImage} />
        };
    };

    constructor(props) {
        super(props);

        this.onCreatePAYGUser = this.onCreatePAYGUser.bind(this);
        this.onCreatePaidUser = this.onCreatePaidUser.bind(this);

        console.ignoredYellowBox = ['Setting a timer'];
    }

    state = {
        region: {
            latitude: 18.471447,
            longitude: -69.9182,
            latitudeDelta: 3,
            longitudeDelta: 3
        }
    };

    componentWillMount() {
        //Ask for permission and get location
        this.getLocationAsync();
    }

    onMarkerChange(markerValues) {
        this.props.signUpLatLongChangeAct({
            latitude: markerValues.coordinate.latitude,
            longitude: markerValues.coordinate.longitude
        });
    }

    onCreatePaidUser() {
        const {
            signUpName,
            signUpEmail,
            signUpPassword,
            signUpCellPhone,
            signUpResidentialPhone,
            signUpAddress,
            signUpPlan,
            signUpApName,
            signUpApEmail,
            signUpApCellPhone,
            signUpApResidentialPhone,
            signUpLatLong,
            appLanguage
        } = this.props;

        this.props.createPaidUserAct({
            signUpName,
            signUpEmail,
            signUpPassword,
            signUpCellPhone,
            signUpResidentialPhone,
            signUpAddress,
            signUpPlan,
            signUpApName,
            signUpApEmail,
            signUpApCellPhone,
            signUpApResidentialPhone,
            signUpLatLong,
            appLanguage
        });
    }

    onCreatePAYGUser() {
        const {
            signUpName,
            signUpEmail,
            signUpPassword,
            signUpCellPhone,
            signUpResidentialPhone,
            signUpAddress,
            signUpPlan,
            signUpApName,
            signUpApEmail,
            signUpApCellPhone,
            signUpApResidentialPhone,
            signUpLatLong,
            appLanguage
        } = this.props;

        this.props.createPAYGUserAct({
            signUpName,
            signUpEmail,
            signUpPassword,
            signUpCellPhone,
            signUpResidentialPhone,
            signUpAddress,
            signUpPlan,
            signUpApName,
            signUpApEmail,
            signUpApCellPhone,
            signUpApResidentialPhone,
            signUpLatLong,
            appLanguage
        });
    }

    getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            //No Access given

            //Message
            const { appLanguage } = this.props;
            const txt = translation[appLanguage];
            Alert.alert(
                txt.MapSignUp.noMapAllowedTitle,
                txt.MapSignUp.noMapAllowedDescription,
                [{ text: 'OK' }],
                { cancelable: false }
            );
        } else {
            const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

            this.map.animateToRegion(
                {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                },
                1000
            );

            this.props.signUpLatLongChangeAct({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
        }
    };

    renderNextBtn() {
        const { appLanguage, signUpPlan } = this.props;
        const txt = translation[appLanguage];

        if (signUpPlan.planPrice === 0) {
            return (
                <FixedButton
                    text={txt.general.btnCreatePAYGUserText}
                    onPress={this.onCreatePAYGUser}
                />
            );
        }

        return (
            <FixedButton text={txt.general.btnCreatePaidUserText} onPress={this.onCreatePaidUser} />
        );
    }

    render() {
        StatusBar.setBarStyle('dark-content', true);
        const { appLanguage, signUpLatLong } = this.props;
        const txt = translation[appLanguage];

        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.mapIndication}>
                    <Text style={styles.textMapIndication}>{txt.MapSignUp.mapIndication}</Text>
                </View>

                <MapView
                    ref={component => {
                        this.map = component;
                    }}
                    style={{ flex: 1 }}
                    initialRegion={this.state.region}
                    onMarkerDragEnd={e => this.onMarkerChange(e.nativeEvent)}
                >
                    <MapView.Marker
                        draggable
                        key={1}
                        coordinate={{
                            latitude: signUpLatLong.latitude,
                            longitude: signUpLatLong.longitude
                        }}
                    />
                </MapView>

                <View>{this.renderNextBtn()}</View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    const {
        signUpName,
        signUpEmail,
        signUpPassword,
        signUpCellPhone,
        signUpResidentialPhone,
        signUpAddress,
        signUpPlan,
        signUpApName,
        signUpApEmail,
        signUpApCellPhone,
        signUpApResidentialPhone,
        signUpLatLong
    } = state.signUpReducer;

    return {
        appLanguage: state.generalReducer.appLanguage,
        signUpLatLong,
        signUpName,
        signUpEmail,
        signUpPassword,
        signUpCellPhone,
        signUpResidentialPhone,
        signUpAddress,
        signUpPlan,
        signUpApName,
        signUpApEmail,
        signUpApCellPhone,
        signUpApResidentialPhone
    };
};

export default connect(
    mapStateToProps,
    { signUpLatLongChangeAct, createPAYGUserAct, createPaidUserAct }
)(MapSignUp);

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
    backBtn: {
        width: 21,
        height: 21,
        marginLeft: 15
    },
    mapIndication: {
        backgroundColor: '#F8F8F9',
        paddingTop: 10,
        paddingBottom: 10
    },
    textMapIndication: {
        fontSize: 14,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
        textAlign: 'center'
    }
});
