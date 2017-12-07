import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { fieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";
import { SubHeaderStyle } from "styles";

class PDIChildReady extends Component{
	onNext(){
		Actions.pdiObey3();
	}

	render(){
		return (
			<ScrollView>
				<Timer />
				<CardSection style={{ flexDirection: "column" }}>
					<Text style={SubHeaderStyle}>
            Ask child if ready.
            Instruct Caregiver to repeat original command.
					</Text>
				</CardSection>
             
				<CardSection>
					<Button onPress={this.onNext.bind(this)}>
            Next
					</Button>
				</CardSection>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, { fieldUpdate })(PDIChildReady);