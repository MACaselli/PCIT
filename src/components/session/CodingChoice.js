import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { formUpdate } from 'actions';
import { Card, CardSection, Button } from 'common';

class CodingChoice extends Component {
	onPre(){
		this.props.formUpdate({ prop: 'type', value: 'Pre/' });
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

	onPost(){
		this.props.formUpdate({ prop: 'type', value: 'Post/' });
		Actions.prePostChoose();
	}

	render(){
		return (
			<Card>
				<CardSection>
					<Button onPress={this.onPre.bind(this)}>
						Pre Treatment Assessment
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

				<CardSection>
					<Button onPress={this.onPost.bind(this)}>
						Post Treatment Assessment
					</Button>
				</CardSection>
			</Card>
		);
	}
}

export default connect(null, { formUpdate })(CodingChoice);