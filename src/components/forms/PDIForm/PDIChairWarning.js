import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { pdiFieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";
import { HeaderStyle } from "styles";

class PDIChairWarning extends Component{
	onYes(){
		this.props.pdiFieldUpdate({ field: "ChairWarning", value: { value: "Yes", time: this.props.time } });
		Actions.pdiObey2();
	}

	onNo(){
		this.props.pdiFieldUpdate({ field: "ChairWarning", value: { value: "No", time: this.props.time } });
		Actions.pdiBegin({newLoop:true});
	}

	render(){
		return (
			<ScrollView>
				<Timer instance={0} />
				<CardSection style={{ flexDirection: "column" }}>
					<Text style={HeaderStyle}>
            Chair Warning
					</Text>
				</CardSection>
             
				<CardSection>
					<Button onPress={this.onYes.bind(this)}>
            Yes
					</Button>
				</CardSection>
				<CardSection>
					<Button onPress={this.onNo.bind(this)}>
            No
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

export default connect(mapStateToProps, { pdiFieldUpdate })(PDIChairWarning);