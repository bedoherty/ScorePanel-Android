/**
 * Scene for handling registration
 */
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, TouchableHighlight, Button, Alert } from 'react-native';

import ShadowedButton from 'react-native-shadowedbutton';
import * as firebase from "firebase";

export default class RegisterScene extends Component {
	constructor(props) {
		super(props);

		this.state = {
			"username": "",
			"password": "",
			"password2": "",
		}

		this.navigator = this.props.navigator;
	}


	/*
	 *	Signup a new user
	 */
	async signup(email, pass) {
	    try {
	        await firebase.auth()
	            .createUserWithEmailAndPassword(email, pass);

	        this.navigator.push({
	        	name: "Events"
	        });

	    } catch (error) {
	        Alert.alert("Registration Attempt", error.toString());
	    }
	}

	tryRegister = () => {
		if (this.state.password == this.state.password2)
		{
			this.signup(this.state.username, this.state.password);
		}
		else
		{
			Alert.alert("Registration Attempt", "Passwords do not match!");
		}
	};

	/*
	 *	Render the scene
	 */
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
					/>
					<TextInput
						style={styles.loginInput}
						onChangeText={(text) => this.setState({"password": text})}
						value={this.state.password}
						placeholder="password"
						secureTextEntry={true}
						underlineColorAndroid="transparent"
					/>
					<TextInput
						style={styles.loginInput}
						onChangeText={(text) => this.setState({"password2": text})}
						value={this.state.password2}
						placeholder="confirm password"
						secureTextEntry={true}
						underlineColorAndroid="transparent"
					/>
				</View>
				<ShadowedButton
					style={[styles.loginButton]}
					buttonColor="#4682b4"
					fontColor="white"
					fontSize={28}
					text="Register"
					shadowHeight={12}
					borderRadius={5}
					fontFamily="Raleway"
					onPress={this.tryRegister}
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