/**
 * ScorePanel React Native App
 */


/*
 *  Import any react/native components
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

/*
 *  Import all our scenes for navigation
 */
import LoginScene from './Scenes/LoginScene';
import RegisterScene from './Scenes/RegisterScene';
import EventsScene from './Scenes/EventsScene';

/*
 *  Import any third party libraries
 */
import * as firebase from "firebase";

export default class ScorePanel extends Component {
  
  constructor(props) {
    super(props);

    //  Initialize our Firebase application
    firebase.initializeApp({
      apiKey: "AIzaSyDn-S_79bT2RrKhP6ULewZR5Xw7xuw82x4",
      authDomain: "bedoher2.firebaseapp.com",
      databaseURL: "https://bedoher2.firebaseio.com",
      storageBucket: "bedoher2.appspot.com"
    });
  }

  //  Define our routing for each scene
  renderScene = (route, navigator) => {
    if(route.name == 'Login') {
      return <LoginScene navigator={navigator} />
    }
    if(route.name == 'Register') {
      return <RegisterScene navigator={navigator} />
    }
    if(route.name == 'Events') {
      return <EventsScene navigator={navigator} />
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: 'Login' }}
        renderScene={ this.renderScene } />
    );
  }
}

AppRegistry.registerComponent('ScorePanel', () => ScorePanel);
