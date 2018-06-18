import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import CodingGrid from "components/forms/CodingGrid";
import { fieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";
import calculateMastery from "utility/calculateMastery";

class CDIForm extends Component{
	onSave(){
		Actions.cdiFollowup();
	}

	renderButton(){
		if (calculateMastery("CDI", this.props.fields)){
			return <Button style={{ buttonStyle:{borderColor: "#008000"}, textStyle:{color: "#008000"} }} onPress={this.onSave.bind(this)}>
        Save Coding (Mastery Met)
			</Button>;
		}
		else{
			return <Button onPress={this.onSave.bind(this)}>
        Save Coding
			</Button>;
		}
	}

	render(){
		let items = {
			0: [{ name: "neutralTalk", label: "Neutral Talk" }, 
				{ name: "behaviorDescription", label: "Behavior Description" }, 
				{ name: "reflection", label: "Reflection" }],

			1: [{ name: "labeledPraise", label: "Labeled Praise" }, 
				{ name: "unlabeledPraise", label: "Unlabeled Praise" }],

			2: [{ name: "question", label: "Question" },
				{ name: "commands", label: "Commands"}, 
				{ name: "negativeTalk", label: "Negative Talk" }],
		};

		return (
			<View style={{ flex: 1 }}>
				<View>
					<Timer instance={0} />
				</View>

				<CodingGrid items={items} />

				<View>
					<CardSection>
             {this.renderButton()}
					</CardSection>
				</View>
			</View>
		);
	}
}

const styles = {
	checkStyle: {
		marginRight: 7,
		marginLeft: 7,
	},
	headerStyle: {
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 15,
		paddingLeft: 15,
		fontSize: 20
	},
	subHeaderStyle: {
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 15,
		paddingLeft: 15,
		fontSize: 17
	}
};

const mapStateToProps = (state) => {
	const { fields } = state.form;

	return { fields };
};

export default connect(mapStateToProps, { fieldUpdate })(CDIForm);