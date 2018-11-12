import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { MapView } from 'expo';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { signUpLatLongChangeAct } from '../actions';
import * as translation from '../config/lang.json';

const backBtnImage = require('../assets/images/back.png');

class MapUpdate extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Map Location'),
            headerBackImage: <Image style={styles.backBtn} source={backBtnImage} />,
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomColor: '#fff'
            },
            headerTitleStyle: {
                fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
                fontSize: 17,
                fontWeight: '200'
            }
        };
    };

    constructor(props) {
        super(props);

        console.ignoredYellowBox = ['Setting a timer'];
    }

    onMarkerChange(markerValues) {
        // console.log(markerValues);
        this.props.signUpLatLongChangeAct({
            latitude: markerValues.coordinate.latitude,
            longitude: markerValues.coordinate.longitude
        });
    }

    render() {
        const { appLanguage, signUpLatLong } = this.props;
        const txt = translation[appLanguage];
        console.log(this.props.signUpLatLong);

        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.mapIndication}>
                    <Text style={styles.textMapIndication}>{txt.MapSignUp.mapIndication}</Text>
                </View>

                <MapView
                    ref={component => {
                        this.map = component;
                    }}
                    style={styles.map}
                    initialRegion={{
                        latitude: signUpLatLong.latitude,
                        longitude: signUpLatLong.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }}
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
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    const { signUpLatLong } = state.signUpReducer;

    return {
        appLanguage: state.generalReducer.appLanguage,
        signUpLatLong
    };
};

export default connect(
    mapStateToProps,
    { signUpLatLongChangeAct }
)(MapUpdate);

const styles = StyleSheet.create({
    map: {
        flex: 1,
        ...ifIphoneX({
            marginBottom: -40
        })
    },  
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
