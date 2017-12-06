import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import CheckBox from "react-native-icon-checkbox";
import { fieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Multiline, IncDecInput, Timer } from "custom";
import { HeaderStyle } from "styles";

class PDITimeoutRoom extends Component{
	onNoResponse(){
		this.props.fieldUpdate({ field: "TimeoutRoom", value: "No response" });
		Actions.pdiBegin();
	}

	onComplete(){
		Actions.pdiTimeoutChair();
	}

	render(){
		return (
			<ScrollView>
				<Timer />
				<CardSection style={{ flexDirection: "column" }}>
					<Text style={HeaderStyle}>
            Time-out Room
					</Text>
				</CardSection>

				<CardSection>
					<Button onPress={this.onNoResponse.bind(this)}>
            No Caregiver Response
					</Button>
				</CardSection>
				<CardSection>
					<Button onPress={this.onComplete.bind(this)}>
            Timeout Room Complete
					</Button>
				</CardSection>
				<Timer />
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, { fieldUpdate })(PDITimeoutRoom);