import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { SegmentedControls } from "react-native-radio-buttons";
import CheckBox from "react-native-icon-checkbox";
import { pdiNewLoop, pdiFieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";
import { CheckStyle } from "styles";

class PDIBegin extends Component{
	componentDidMount(){
		if(this.props.newLoop) this.props.pdiNewLoop({ type: "sequence" });
	}

	onNext(){
		Actions.pdiObey1();
	}

	onComplete(){
		Actions.pdiSummary();
	}

	render(){
		const options = ["DC", "IC"];
		return (
			<ScrollView>
				<Timer instance={0} />
        
				<CardSection style={{ flexDirection: "column", paddingLeft: 10, paddingRight: 10 }}> 
					<SegmentedControls
						options={ options }
						onSelection={value => this.props.pdiFieldUpdate({ field: "DcIc", value: { value, time: this.props.time } })}
						selectedOption={this.props.sequence.DcIc.value}
						optionStyle={{ fontSize: 18 }}
					/>
				</CardSection>

				<CardSection style={{ flexDirection: "column" }}>
					<CheckBox
						label="Effective"
						size={30}
						iconStyle={CheckStyle}
						onPress={value => this.props.pdiFieldUpdate({ field: "Effective", value: { value, time: this.props.time } })}
						checked={this.props.sequence.Effective.value}
					/>
					<CheckBox
						label="No Opportunity"
						size={30}
						iconStyle={CheckStyle}
						onPress={value => this.props.pdiFieldUpdate({ field: "NoOpportunity", value: { value, time: this.props.time } })}
						checked={this.props.sequence.NoOpportunity.value}           
					/>
				</CardSection>

				<CardSection>
					<Button onPress={this.onNext.bind(this)}>
            Next
					</Button>
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

export default connect(mapStateToProps, { pdiNewLoop, pdiFieldUpdate })(PDIBegin);