import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { fieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";
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
				<Timer instance={0} />
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
				<Timer instance={0} />
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, { fieldUpdate })(PDITimeoutRoom);