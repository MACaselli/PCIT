import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { formUpdate } from '../../actions';
import { Card, CardSection, Button } from '../common';

class CodingChoice extends Component {
	onPrePost(){
		Actions.prePostChoose();
	}

	onCDI(){
		this.props.formUpdate({ prop: 'type', value: 'CDI' });
		Actions.codingBegin();
	}

	onPDI(){
		this.props.formUpdate({ prop: 'type', value: 'PDI' });
		Actions.codingBegin();
	}

	render(){
		return (
			<Card>
				<CardSection>
					<Button onPress={this.onPrePost}>
						Pre/Post Treatment Assessment
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={this.onCDI.bind(this)}>
						CDI
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={this.onPDI.bind(this)}>
						PDI
					</Button>
				</CardSection>
			</Card>
		);
	}
}

export default connect(null, { formUpdate })(CodingChoice);