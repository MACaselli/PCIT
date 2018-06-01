import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { pdiFieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";

class PDIObey2 extends Component{
	onObey(){
		this.props.pdiFieldUpdate({ field: "Obey2", value: { value: "Obey", time: this.props.time } });
		Actions.pdiPraise();
	}

	onDisobey(){
		this.props.pdiFieldUpdate({ field: "Obey2", value: { value: "Disobey", time: this.props.time } });
		Actions.pdiTimeoutChair();
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
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	const { timers } = state.form;
	return { time: timers[0].time };
};

export default connect(mapStateToProps, { pdiFieldUpdate })(PDIObey2);