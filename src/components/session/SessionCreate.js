import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import { sessionCreate, sessionUpdate, sessionReset } from "actions";
import { Card, CardSection, Button } from "common";
import SessionForm from "components/session/SessionForm";

class SessionCreate extends Component {
	componentWillMount() {
		this.props.sessionReset();
		const date = new Date();
		this.props.sessionUpdate({ prop: "date", value: `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}` });
	}    

	onCreatePress(){
		const { uid, date, daysofhomework, ecbiscores } = this.props;
		this.props.sessionCreate({ uid, date, daysofhomework, ecbiscores });
	}

	render() {
		return (
			<ScrollView>
				<Card>
					<SessionForm />
          
					<CardSection>
						<Button onPress={this.onCreatePress.bind(this)}>
              Session Complete
						</Button>
					</CardSection>
				</Card>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	const { uid, guardians } = state.clientForm;
	const { date } = state.session;
	var { daysofhomework, ecbiscores } = state.session;

	return { uid, date, daysofhomework, ecbiscores };
};

export default connect(mapStateToProps, { sessionCreate, sessionUpdate, sessionReset })(SessionCreate);
