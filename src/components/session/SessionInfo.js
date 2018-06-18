import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import { sessionUpdate, sessionSave, sessionDelete, sessionReset } from "actions";
import { Card, CardSection, Button } from "common";
import { DirSelect } from "custom";
import SessionForm from "components/session/SessionForm";
import exportData from "utility/exportData";

class SessionInfo extends Component {
	state = { showModal: false };

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

	onExportPress(){
		this.setState({ showModal: true });
	}

	onExportConfirm(path){
		const { session_state } = this.props;
		exportData(path, session_state);
		this.setState({ showModal: false })
	}

	onExportDecline(){
		this.setState({ showModal: false });
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
					<CardSection>
						<Button onPress={this.onExportPress.bind(this)}>
              Export Session
						</Button>
					</CardSection>
					<DirSelect
						visible={this.state.showModal}
						onAccept={this.onExportConfirm.bind(this)}
						onDecline={this.onExportDecline.bind(this)}
					>
						Export?
					</DirSelect>
				</Card>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	const session_state = state.session;
	const { uid } = state.clientForm;
	const { date, index } = state.session;
	var { daysofhomework, ecbiscores } = state.session;

	return { session_state, uid, sessionid: index, date, daysofhomework, ecbiscores };
};

export default connect(mapStateToProps, { sessionUpdate, sessionSave, sessionDelete, sessionReset })(SessionInfo);
