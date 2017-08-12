import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { formUpdate } from '../../../actions';
import { Card, CardSection, Button, Input } from '../../common';

class PrePostChoose extends Component {
	onChildLed(){
		this.props.formUpdate({ prop: 'type', value: 'PrePost/ChildLed' })
		Actions.codingBegin();
	}

	onParentLed(){
		this.props.formUpdate({ prop: 'type', value: 'PrePost/ParentLed' })
		Actions.codingBegin();
	}

	onCleanUp(){
		this.props.formUpdate({ prop: 'type', value: 'PrePost/CleanUp' })
		Actions.codingBegin();
	}

	render(){
		return (
			<Card>
				<CardSection>
					<Button onPress={this.onChildLed.bind(this)}>
						Child Led Play
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={this.onParentLed.bind(this)}>
						Parent Led Play
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={this.onCleanUp.bind(this)}>
						Clean Up
					</Button>
				</CardSection>
			</Card>
		);
	}
}

export default connect(null, { formUpdate })(PrePostChoose);