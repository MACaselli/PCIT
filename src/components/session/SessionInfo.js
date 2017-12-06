import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Slider, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import DatePicker from "react-native-datepicker";
import { sessionUpdate, sessionSave, sessionDelete, sessionReset } from "actions";
import { Card, CardSection, Button, Input } from "common";
import { IncDecInput, SliderInput } from "custom";
import { HeaderStyle, SubHeaderStyle } from "styles";
import SessionForm from "components/session/SessionForm";

class SessionInfo extends Component {
	componentWillMount() {
		this.fillSessionWithInfo();
	}

	fillSessionWithInfo(){
		this.props.sessionReset();
		_.each(this.props.session, (value, prop) => {
			this.props.sessionUpdate({ prop, value });
		});
	}

	onCodingPress(){
		Actions.codingChoice();
	}

	onSavePress(){
		const { uid, sessionid, date, daysofhomework, ecbiscores } = this.props;
		this.props.sessionSave({ uid, sessionid, date, daysofhomework, ecbiscores });
	}

	onDeletePress(){
		const { uid, sessionid } = this.props;
		this.props.sessionDelete({ uid, sessionid });
	}

	render() {
		return (
			<ScrollView>
				<Card>
					<SessionForm />

					<CardSection>
						<Button onPress={this.onCodingPress}>
              Add Coding
						</Button>
					</CardSection>

					<CardSection>
						<Button onPress={this.onSavePress.bind(this)}>
              Save Session
						</Button>
					</CardSection>
					<CardSection>
						<Button onPress={this.onDeletePress.bind(this)}>
              Delete Session
						</Button>
					</CardSection>
				</Card>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	const { uid } = state.clientForm;
	const { date, index } = state.session;
	var { daysofhomework, ecbiscores } = state.session;

	return { uid, sessionid: index, date, daysofhomework, ecbiscores };
};

export default connect(mapStateToProps, { sessionUpdate, sessionSave, sessionDelete, sessionReset })(SessionInfo);
