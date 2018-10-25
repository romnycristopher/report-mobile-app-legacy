//
// ──────────────────────────────────────────────────── I ──────────
//   :::::: I M P O R T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────
//

//
// ─── LIBRARIES ──────────────────────────────────────────────────────────────────
//
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import * as translation from '../config/lang.json';

//
// ─── ASSETS ─────────────────────────────────────────────────────────────────────
//
const bgImage = require('../assets/images/dashboard_bg.png');
const logoRed = require('../assets/images/logo-red.png');
const reportBtnIconWifi = require('../assets/images/reportBtnWifi.png');
const reportBtnIconAudio = require('../assets/images/reportBtnAudio.png');
const reportBtnIconSecurity = require('../assets/images/reportBtnSecurity.png');
const reportBtnArrow = require('../assets/images/reportBtnArrow.png');
const menuIcon = require('../assets/images/menu_icon.png');

//
// ────────────────────────────────────────────────────────── II ──────────
//   :::::: C O M P O N E N T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
//

class Dashboard extends Component {
  static navigationOptions = () => {
    return {
      headerTransparent: true,
      headerStyle: {
        backgroundColor: 'transparent'
      },
      headerRight: (
          <TouchableWithoutFeedback
            onPress={() => console.log('x')}
            
          >
            <View style={style.reportsCountWrap}>
              <Text style={style.reportsCountText}>Reports</Text>
              <View style={style.reportsCountNumWrap}>
                <Text style={style.reportsCountNum}>0</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
      ),
      headerLeft: (
          <TouchableWithoutFeedback
            onPress={() => console.log('x')}
          >
            <Image source={menuIcon} style={style.menuIcon} />
          </TouchableWithoutFeedback>
      )
    };
  };
  

  constructor(props) {
    super(props);
    const { width, height } = Dimensions.get('window');
    this.state = {
      width,
      height
    };
  }

  render() {
    const { appLanguage } = this.props;
    const txt = translation[appLanguage];
    
    return (
      <SafeAreaView style={style.safeArea}>
        <Image source={bgImage} style={style.backgroundImage} />
        <View style={style.sectionInfo}>
          <Image source={logoRed} style={style.logoRed} />
          <View style={style.sectionTitleWrap}>
            <Text style={style.title}>{txt.dashboard.title}</Text>
            <Text style={style.subtitle}>{txt.dashboard.subtitle}</Text>
          </View>
        </View>
        <View>
          <View style={style.reportBtnsWrap}>
            <TouchableHighlight 
              onPress={() => {
                this.props.navigation.openDrawer();
              }}
            >
              <View style={style.reportBtn}>
                <View style={style.reportBtnInfo}>
                    <Image source={reportBtnIconWifi} style={style.reportBtnIcon} />
                    <View>
                      <Text style={style.reportBtnTitle}>
                        {txt.dashboard.reportBtnInternetTitle}
                      </Text>
                      <Text style={style.reportBtnSubTitle}>
                        {txt.dashboard.reportBtnInternetSubTitle}
                      </Text>
                  </View>
                </View>
                <View>
                  <Image source={reportBtnArrow} style={style.reportBtnArrow} />
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => console.log('Audio')}>
              <View style={style.reportBtn}>
                <View style={style.reportBtnInfo}>
                  <Image source={reportBtnIconAudio} style={style.reportBtnIcon} />
                  <View>
                    <Text style={style.reportBtnTitle}>{txt.dashboard.reportBtnAudioTitle}</Text>
                    <Text style={style.reportBtnSubTitle}>
                      {txt.dashboard.reportBtnAudioSubTitle}
                    </Text>
                  </View>
                </View>
                <View>
                  <Image source={reportBtnArrow} style={style.reportBtnArrow} />
                </View>
              </View>
            </TouchableHighlight>
            
            <TouchableHighlight onPress={() => console.log('Security')}>
              <View style={style.reportBtnLast}>
                <View style={style.reportBtnInfo}>
                  <Image source={reportBtnIconSecurity} style={style.reportBtnIcon} />
                  <View>
                    <Text style={style.reportBtnTitle}>{txt.dashboard.reportBtnSecurityTitle}</Text>
                    <Text style={style.reportBtnSubTitle}>
                      {txt.dashboard.reportBtnSecuritySubTitle}
                    </Text>
                  </View>
                </View>
                <View>
                  <Image source={reportBtnArrow} style={style.reportBtnArrow} />
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    appLanguage: state.generalReducer.appLanguage
  };
};

export default connect(mapStateToProps)(Dashboard);

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  menuIcon: {
    width: 20,
    height: 17,
    marginLeft: 15
  },
  reportsCountWrap: {
    width: 95,
    height: 29,
    backgroundColor: '#2C2A25',
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
    paddingLeft: 10,
    borderRadius: 25,
    alignItems: 'center'
  },
  reportsCountText: {
    color: '#fff',
    fontFamily: 'Avenir',
  },
  reportsCountNumWrap: {
    backgroundColor: '#F4313F',
    borderRadius: 25,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },  
  reportsCountNum: {
    fontFamily: 'Avenir',
    color: '#fff',
    fontSize: 10
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'cover',
    flex: 1
  },
  sectionInfo: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitleWrap: {
    alignItems: 'center',
    marginTop: 30
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: '100',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    fontFamily: 'Avenir',
    fontSize: 13,
    color: '#959492',
    textAlign: 'center',
    width: 300
  },
  logoRed: {
    width: 113,
    height: 116
  },
  reportProblemlabel: {
    backgroundColor: '#E4E4E4',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 5,
    paddingTop: 5
  },
  reportProblemlabelTxt: {
    fontWeight: '900',
    fontSize: 17,
    fontFamily: 'Avenir'
  },
  reportBtnsWrap: {
    ...ifIphoneX({
      backgroundColor: '#F4313F',
      marginBottom: -40,
      paddingBottom: 30
    })    
  },
  reportBtn: {
    backgroundColor: '#F4313F',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderBottomColor: '#EA2F3E',
    borderBottomWidth: 1,
  },
  reportBtnLast: {
    backgroundColor: '#F4313F',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderBottomColor: '#EA2F3E',
 
  },
  reportBtnInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  reportBtnTitle: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: -5
  },
  reportBtnSubTitle: {
    color: '#fff',
    opacity: 0.75,
    fontFamily: 'Avenir'
  },
  reportBtnIcon: {
    height: 29,
    width: 29,
    marginRight: 7
  },
  reportBtnArrow: {
    width: 12,
    height: 20
  }
});
