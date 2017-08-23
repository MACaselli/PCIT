import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import _ from 'lodash';
import { formUpdate, fieldInitialize } from '../../../actions';
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
		const { type } = this.props
		this.props.fieldInitialize({ formType: type });
		switch(this.props.type){
			case 'Pre/ChildLed':
			case 'Pre/ParentLed':
			case 'Pre/CleanUp':
			case 'Post/ChildLed':
			case 'Post/ParentLed':
			case 'Post/CleanUp':
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
						{ this.props.prompt }
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

function resolvePronoun(gender){
	// Resolve proper pronouns based on English grammar. Components are divided by their usage in a sentence.
	switch (gender){
		case 'Male':
			return { subject: 'he', object: 'him', possessive: 'his', reflexive: 'himself' }
		case 'Female':
			return { subject: 'she', object: 'her', possessive: 'her', reflexive: 'herself' }
		default:
			return { subject: 'they', object: 'them', possessive: 'their', reflexive: 'themself' }
	}
}

function resolvePrompt(type, name, gender){
	const pronoun = resolvePronoun(gender);
	switch(type){
		case 'CDI':
			return `We’re going to start CDI now.  I’m going to watch and code for the next 5 minutes to see how things are going before starting to coach CDI.  Tell ${name} it is special time and ${pronoun.subject} can play with any of the toys.  Use all the CDI skills you’ve been practicing while you follow along with ${name} in ${pronoun.possessive} play according to ${pronoun.possessive} rules.`
		case 'PDI':
			return `Now we are going to switch to PDI.  Choose any activity and get ${name} to follow your rules.  Remember to use direct commands and follow through with labeled praise or the warning.  Use CDI skills in between commands.`;
		case 'PrePost/ChildLed':
			return `In this situation tell ${name} that ${pronoun.subject} may play with whatever they choose.  Let ${pronoun.object} choose any activity ${pronoun.subject} wishes.  You just follow ${pronoun.possessive} lead and play along with ${pronoun.object}.`;
		case 'PrePost/ParentLed':
			return `Now we are going to switch to the second situation.  Please don’t clean up or put away any of the toys until after we finish this situation.  Tell ${name} that it is your turn to choose what to play.  You may choose any activity.  Keep ${pronoun.object} playing with you according to your rules.`;
		case 'PrePost/CleanUp':
			return `Now please tell ${name} that it is time to clean up the toys.  Make sure you have ${pronoun.object} put the toys away by ${pronoun.reflexive}.  Have ${pronoun.object} put all the toys in their containers and all the containers {in the toy box/on the toy shelf}.`;
	}
}

const mapStateToProps = (state) => {
	const { name, gender, guardians } = state.clientForm;
	const { type } = state.form;
	const prompt = resolvePrompt(type, name, gender);

	return { guardians, type, prompt }
}

export default connect(mapStateToProps, { formUpdate, fieldInitialize })(CodingBegin);