import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { SegmentedControls } from "react-native-radio-buttons";
import CheckBox from "react-native-icon-checkbox";
import { fieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";
import { CheckStyle } from "styles";

class PDIBegin extends Component{
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
				<Timer />
        
				<CardSection style={{ flexDirection: "column", paddingLeft: 10, paddingRight: 10 }}> 
					<SegmentedControls
						options={ options }
						onSelection={value => this.props.fieldUpdate({ field: "DcIc", value })}
						selectedOption={this.props.fields.DcIc}
						optionStyle={{ fontSize: 18 }}
					/>
				</CardSection>

				<CardSection style={{ flexDirection: "column" }}>
					<CheckBox
						label="Effective"
						size={30}
						iconStyle={CheckStyle}
						onPress={value => this.props.fieldUpdate({ field: "Effective", value })}
						checked={this.props.fields.Effective}
					/>
					<CheckBox
						label="No Opportunity"
						size={30}
						iconStyle={CheckStyle}
						onPress={value => this.props.fieldUpdate({ field: "NoOpportunity", value })}
						checked={this.props.fields.NoOpportunity}           
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
	const { fields } = state.form;

	return { fields };
};

export default connect(mapStateToProps, { fieldUpdate })(PDIBegin);