/**
 * Scene for handling login
 */
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, TouchableHighlight, Button, Alert } from 'react-native';

import ShadowedButton from 'react-native-shadowedbutton';
import * as firebase from "firebase";

export default class LoginScene extends Component {
	constructor(props) {
		super(props);

		this.state = {
			"username": "",
			"password": ""
		}

		this.navigator = this.props.navigator;
	}

	async login(email, pass) {
		try {
			await firebase.auth()
			.signInWithEmailAndPassword(email, pass);

			this.navigator.push({
	        	name: "Events"
	        });

		} catch (error) {
			Alert.alert("Login Attempt", error.toString());
		}
	}

	tryLogin = () => {
		this.login(this.state.username, this.state.password);
	};

	gotoRegister = () => {
		this.navigator.push({
			name: 'Register'
		});
	};

	focusNextField = (nextField) => {
		this.refs[nextField].focus();
	};

	render() {
		return (
			<View style={styles.backgroundView}>
				<Text style={styles.loginHeader}>
					ScorePanel
				</Text>
				<View style={styles.contentBox}>
					<TextInput
						style={styles.loginInput}
						onChangeText={(text) => this.setState({"username": text})}
						value={this.state.username}
						placeholder="email"
						underlineColorAndroid="transparent"
						returnKeyType="next"
						ref="1"
						onSubmitEditing={() => this.focusNextField('2')}
					/>
					<TextInput
						style={styles.loginInput}
						onChangeText={(text) => this.setState({"password": text})}
						value={this.state.password}
						placeholder="password"
						secureTextEntry={true}
						underlineColorAndroid="transparent"
						returnKeyType="done"
						onSubmitEditing={this.tryLogin}
						ref="2"
					/>
				</View>
				<ShadowedButton
					style={styles.loginButton}
					buttonColor="#4682b4"
					fontColor="white"
					fontSize={28}
					text="Login"
					shadowHeight={12}
					borderRadius={5}
					fontFamily="Raleway"
					onPress={this.tryLogin}
				/>
				<ShadowedButton
					style={[styles.loginButton, {marginTop: 10}]}
					buttonColor="#4682b4"
					fontColor="white"
					fontSize={28}
					text="New User"
					shadowHeight={12}
					borderRadius={5}
					fontFamily="Raleway"
					onPress={this.gotoRegister}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  backgroundView: {
    backgroundColor: 'cornflowerblue',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
  	backgroundColor: "white",
  	width: '80%',
  	elevation: 5,
  },
  loginHeader: {
  	textAlign: "center",
  	fontSize: 56,
  	marginTop: 10,
  	marginBottom: 20,
  	color: 'white',
  	fontFamily: 'Raleway'
  },
  loginInput: {
  	borderWidth: 0,
  	paddingLeft: 10,
  	borderBottomWidth: 1,
  	borderBottomColor: 'whitesmoke'
  },
  loginButton: {
  	width: '80%',
  	backgroundColor: 'white',
  	height: 50,
  	backgroundColor: 'transparent',
  	marginTop: 20
  }
});