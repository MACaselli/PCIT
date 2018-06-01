import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { pdiNewLoop, pdiFieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";
import { HeaderStyle } from "styles";

class PDITimeoutChair extends Component{
	componentDidMount(){
		this.props.pdiNewLoop({ type: "timeout" });
	}

	onStay(){
		this.props.pdiFieldUpdate({ field: "TimeoutChair", value: { value: "Stays on", time: this.props.time }, isTimeout: true });
		Actions.pdiChildReady();
	}

	onGetOff(){
		this.props.pdiFieldUpdate({ field: "TimeoutChair", value: { value: "Gets off", time: this.props.time }, isTimeout: true });
		Actions.pdiTimeoutRoom();
	}

	onNoResponse(){
		this.props.pdiFieldUpdate({ field: "TimeoutChair", value: { value: "No response", time: this.props.time }, isTimeout: true });
		Actions.pdiBegin({newLoop:true});
	}

	render(){
		return (
			<ScrollView>
				<Timer instance={0} />
				<CardSection style={{ flexDirection: "column" }}>
					<Text style={HeaderStyle}>
            Time-out Chair
					</Text>
				</CardSection>

				<CardSection>
					<Button onPress={this.onStay.bind(this)}>
            Stays On
					</Button>
				</CardSection>
				<CardSection>
					<Button onPress={this.onGetOff.bind(this)}>
            Gets Off
					</Button>
				</CardSection>
				<CardSection>
					<Button onPress={this.onNoResponse.bind(this)}>
            No Caregiver Response
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

export default connect(mapStateToProps, { pdiNewLoop, pdiFieldUpdate })(PDITimeoutChair);