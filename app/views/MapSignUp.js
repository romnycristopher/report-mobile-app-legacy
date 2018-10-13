import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { Location, Permissions, MapView } from 'expo';
import { signUpLatLongChangeAct } from '../actions';
import { FixedButton } from '../components/FixedButton';
import * as translation from '../config/lang.json';

const backBtnImage = require('../assets/images/backBtn.png');

class MapSignUp extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerBackTitle: null,
      title: navigation.getParam('title', 'Map Location'),
      headerBackImage: <Image style={styles.backBtn} source={backBtnImage} />
    };
  };

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
    // console.log(markerValues);
    this.props.signUpLatLongChangeAct({
      latitude: markerValues.coordinate.latitude,
      longitude: markerValues.coordinate.longitude
    });
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      // console.log('not granted');
      //No Access given

      //Message
      const { appLanguage } = this.props;
      const txt = translation[appLanguage];
      Alert.alert(
        txt.MapSignUp.noMapAllowedTitle,
        txt.MapSignUp.noMapAllowedDescription,
        [{ text: 'OK' /*, onPress: () => console.log('OK Pressed')*/ }],
        { cancelable: false }
      );
    } else {
      // console.log('granted');
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

  render() {
    const { appLanguage, signUpLatLong } = this.props;
    const txt = translation[appLanguage];
    // console.log(signUpLatLong);
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
          ;
        </MapView>

        <View>
          <FixedButton
            text={'Next'}
            onPress={() =>
              this.props.navigation.navigate('PaypalWebview', {
                title: txt.PaypalWebview.headerTitle
              })
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    appLanguage: state.generalReducer.appLanguage,
    signUpLatLong: state.signUpReducer.signUpLatLong
  };
};

export default connect(
  mapStateToProps,
  { signUpLatLongChangeAct }
)(MapSignUp);

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between'
  },
  backBtn: {
    width: 7,
    height: 18,
    marginLeft: 15
  },
  mapIndication: {
    backgroundColor: '#F8F8F9',
    paddingTop: 10,
    paddingBottom: 10
  },
  textMapIndication: {
    fontSize: 14,
    fontFamily: 'Avenir',
    textAlign: 'center'
  }
});
