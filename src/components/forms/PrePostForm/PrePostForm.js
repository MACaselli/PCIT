import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { fieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { IncDecInput, Timer, CodingGrid } from "custom";

class PrePostForm extends Component{
	handleIncDec(field, type){
		const current = Number(this.props.fields[field]);
		var value = 0;

		if (type === "Inc"){
			value = current + 1;
		}
		else if (type === "Dec" && current > 0){
			value = current - 1;
		}
		else{
			value = current;
		}

		this.props.fieldUpdate({ field, value });
	}

	onSave(){
		Actions.prePostFollowup();
	}

	render(){
		return (
			<View style={{ flex: 1 }}>
				<View>
					<Timer />
				</View>
				
				<CodingGrid />

				<View>
					<CardSection>
						<Button onPress={this.onSave.bind(this)}>
              Save Coding
						</Button>
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

export default connect(mapStateToProps, { fieldUpdate })(PrePostForm);