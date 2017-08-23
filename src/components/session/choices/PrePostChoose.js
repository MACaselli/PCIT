import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { formUpdate } from '../../../actions';
import { Card, CardSection, Button, Input } from '../../common';

class PrePostChoose extends Component {
	onChildLed(type){
		this.props.formUpdate({ prop: 'type', value: type.concat('ChildLed') })
		Actions.codingBegin();
	}

	onParentLed(type){
		this.props.formUpdate({ prop: 'type', value: type.concat('ParentLed') })
		Actions.codingBegin();
	}

	onCleanUp(type){
		this.props.formUpdate({ prop: 'type', value: type.concat('CleanUp') })
		Actions.codingBegin();
	}

	render(){
		const { type } = this.props;
		return (
			<Card>
				<CardSection>
					<Button onPress={this.onChildLed.bind(this, type)}>
						Child Led Play
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={this.onParentLed.bind(this, type)}>
						Parent Led Play
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={this.onCleanUp.bind(this, type)}>
						Clean Up
					</Button>
				</CardSection>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { type } = state.form;
	return { type }; 
}

export default connect(mapStateToProps, { formUpdate })(PrePostChoose);