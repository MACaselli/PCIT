import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { pdiFieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";

class PDIObey3 extends Component{
	onObey(){
		this.props.pdiFieldUpdate({ field: "Obey3", value: { value: "Obey", time: this.props.time } });
		Actions.pdiParentConfirm();
	}

	onDisobey(){
		this.props.pdiFieldUpdate({ field: "Obey3", value: { value: "Disobey", time: this.props.time } });
		Actions.pdiTimeoutChair();
	}

	onNoResponse(){
		this.props.pdiFieldUpdate({ field: "Obey3", value: { value: "No response", time: this.props.time } });
		Actions.pdiBegin({newLoop:true});
	}

	render(){
		return (
			<ScrollView>
				<Timer instance={0} />
				<CardSection>
					<Button onPress={this.onObey.bind(this)}>
            Obey
					</Button>
				</CardSection>
				<CardSection>
					<Button onPress={this.onDisobey.bind(this)}>
            Disobey
					</Button>
				</CardSection>
				<CardSection>
					<Button onPress={this.onNoResponse.bind(this)}>
            No Caregiver Response
					</Button>
				</CardSection>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	const { timers } = state.form;
	return { time: timers[0].time };
};

export default connect(mapStateToProps, { pdiFieldUpdate })(PDIObey3);