import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import _ from 'lodash';
import { formUpdate } from '../../../actions';
import { Card, CardSection, Button, Input } from '../../common';

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
		
	}

	render(){
		return (
			<Card>
				<CardSection style={{ flexDirection: 'column' }}>
				<Text style={styles.headerStyle}>Attendees</Text>
				{
					_.map(this.state.attending, (guardian, index) => {
						return (
							<CheckBox
								label={guardian.name}
								size={30}
								checked={guardian.isAttending}
								onPress={this.onAttendingChange.bind(this, index)}
								iconStyle={styles.checkStyle}
							/>
						)
					})
				}
				</CardSection>

				<CardSection>
					<Text>
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
  checkStyle: {
    marginRight: 7,
    marginLeft: 7
  },
  headerStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
    fontSize: 20
  }
}

const mapStateToProps = (state) => {
	const { guardians } = state.clientForm;
	const { type } = state.form;
	var message = '';

	// Message depending on type.
	switch(type){
		case 'CDI':
			message = "CDI Message";
			break;
		case 'PDI':
			message = "PDI Message";
			break;
		case 'PrePost/ChildLed':
			message = "Child led Message";
			break;
		case 'PrePost/ParentLed':
			message = "Parent led Message";
			break;
		case 'PrePost/CleanUp':
			message = "Clean up Message";
	}

	return { guardians, type, message }
}

export default connect(mapStateToProps, { formUpdate })(CodingBegin);