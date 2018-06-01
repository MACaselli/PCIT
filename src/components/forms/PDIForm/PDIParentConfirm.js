import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import CheckBox from "react-native-icon-checkbox";
import { pdiFieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";
import { CheckStyle } from "styles";

class PDIParentConfirm extends Component{
	onComplete(){
		Actions.pdiBegin({newLoop:true});
	}

	render(){
		return (
			<ScrollView>
				<Timer instance={0} />
				<CardSection style={{ flexDirection: "column" }}>
					<CheckBox
						label="Parent Say Ok"
						size={30}
						iconStyle={CheckStyle}
						checked={this.props.sequence.ParentConfirm.value}
						onPress={value => this.props.pdiFieldUpdate({ field: "ParentConfirm", value: { value, time: this.props.time } })}
					/>
				</CardSection>

				<CardSection>
					<Button onPress={this.onComplete.bind(this)}>
            Complete Coding
					</Button>
				</CardSection>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	const { sequences, timers } = state.form;

	return { sequence: sequences[sequences.length - 1], time: timers[0].time };
};

export default connect(mapStateToProps, { pdiFieldUpdate })(PDIParentConfirm);