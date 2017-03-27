/**
 * Scene for handling displaying of all events
 */
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, TouchableHighlight, Button, Alert, ListView } from 'react-native';

import ShadowedButton from 'react-native-shadowedbutton';
import * as firebase from "firebase";

export default class EventsScene extends Component {
	constructor(props) {
		super(props);

		//	Setup our ListView DataSource
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		this.state = {
			events: [],
			dataSource: this.ds.cloneWithRows([]),
		};

		this.navigator = this.props.navigator;

		this.ref = null;
	}

	// On mount, subscribe to ref updates
	componentDidMount() {
		this.ref = firebase.database().ref('Events');
		this.ref.on('value', this.handlePostUpdate);
	}

	// On unmount, ensure we no longer listen for updates
	componentWillUnmount() {
		if (this.ref) {
			this.ref.off('value', this.handlePostUpdate);
		}
	}

	// Bind the method only once to keep the same reference
	handlePostUpdate = (eventsObject) => {
		var eventList = eventsObject.val();

		Alert.alert('Post Content', JSON.stringify(eventList));
		
		//	Reset our events list
		this.setState({
			"events": []
		});

		//	Iterate through and add any events
		for (var eventKey in eventList) {
			if (eventList.hasOwnProperty(eventKey)) {
				Alert.alert(eventKey + " -> " + eventList[eventKey]);
				this.setState({
					"events": this.state.events.concat([eventKey])
				});
			}
		}
		this.setState({
			"dataSource": this.ds.cloneWithRows(this.state.events)
		});
	}

	render() {
		return (
			<View style={styles.backgroundView}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => <Text>{rowData}</Text>}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  backgroundView: {
    backgroundColor: 'whitesmoke',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});