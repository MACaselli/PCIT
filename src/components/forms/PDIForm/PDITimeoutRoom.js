import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { pdiFieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";
import { HeaderStyle } from "styles";

class PDITimeoutRoom extends Component{
	onNoResponse(){
		this.props.pdiFieldUpdate({ field: "TimeoutRoom", value: { value: "No response", time: this.props.time }, isTimeout: true });
		Actions.pdiBegin({newLoop:true});
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
				<Timer instance={1} />
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	const { timers } = state.form;
	return { time: timers[1].time };
};

export default connect(mapStateToProps, { pdiFieldUpdate })(PDITimeoutRoom);