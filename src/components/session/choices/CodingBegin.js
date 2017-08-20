import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import _ from 'lodash';
import { formUpdate } from '../../../actions';
import { Card, CardSection, Button, Input } from '../../common';
import { HeaderStyle, CheckStyle } from '../../../styles';

class CodingBegin extends Component {
	constructor(props){
		super(props);
		// Create new object from guardians, adding an isAttending property to track UI state within component context.
		var attending = {};
		_.map(props.guardians, (guardian, index) => {
			attending[index] = { ...guardian, isAttending: false }
		});	
		this.state = { attending };
	}

	onAttendingChange(index){
		this.setState((prev) => {
			return { attending: {...prev.attending, [index]: { ...prev.attending[index], isAttending: !prev.attending[index].isAttending } } }
		});
	}

	onBegin(){
		switch(this.props.type){
			case 'PrePost/ChildLed':
			case 'PrePost/ParentLed':
			case 'PrePost/CleanUp':
				Actions.prePostForm();
				break;
			case 'CDI':
				Actions.cdiForm();
				break;
			case 'PDI':
				Actions.pdiBegin();
				break;
			default:
				break;
		}
	}

	render(){
		return (
			<Card>
				<CardSection style={{ flexDirection: 'column' }}>
					<Text style={HeaderStyle}>Attendees</Text>
					{
						_.map(this.state.attending, (guardian, index) => {
							return (
								<CheckBox
									label={guardian.name}
									size={30}
									checked={guardian.isAttending}
									onPress={this.onAttendingChange.bind(this, index)}
									iconStyle={CheckStyle}
								/>
							)
						})
					}
				</CardSection>

				<CardSection>
					<Text style={styles.textStyle}>
						{ this.props.message }
					</Text>
				</CardSection>

				<CardSection>
					<Button onPress={this.onBegin.bind(this)}>
						Begin Coding
					</Button>
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	textStyle: {
		paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
    fontSize: 18
	}
}

const mapStateToProps = (state) => {
	const { name, guardians } = state.clientForm;
	const { type } = state.form;
	var message = '';

	// Message depending on type.
	switch(type){
		case 'CDI':
			message = `We’re going to start CDI now.  I’m going to watch and code for the next 5 minutes to see how things are going before starting to coach CDI.  Tell ${name} it is special time and he/she can play with any of the toys.  Use all the CDI skills you’ve been practicing while you follow along with ${name} in his/her play according to his/her rules.`;
			break;
		case 'PDI':
			message = `Now we are going to switch to PDI.  Choose any activity and get ${name} to follow your rules.  Remember to use direct commands and follow through with labeled praise or the warning.  Use CDI skills in between commands.`;
			break;
		case 'PrePost/ChildLed':
			message = `In this situation tell ${name} that he/she may play with whatever they choose.  Let him/her choose any activity he/she wishes.  You just follow his/her lead and play along with him/her.`;
			break;
		case 'PrePost/ParentLed':
			message = `Now we are going to switch to the second situation.  Please don’t clean up or put away any of the toys until after we finish this situation.  Tell ${name} that it is your turn to choose what to play.  You may choose any activity.  Keep him/her playing with you according to your rules.`;
			break;
		case 'PrePost/CleanUp':
			message = `Now please tell ${name} that it is time to clean up the toys.  Make sure you have him/her put the toys away by him/herself.  Have him/her put all the toys in their containers and all the containers {in the toy box/on the toy shelf}.`;
	}

	return { guardians, type, message }
}

export default connect(mapStateToProps, { formUpdate })(CodingBegin);