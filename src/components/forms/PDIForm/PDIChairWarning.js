import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { fieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";
import { HeaderStyle } from "styles";

class PDIChairWarning extends Component{
	onYes(){
		this.props.fieldUpdate({ field: "ChairWarning", value: "Yes" });
		Actions.pdiObey2();
	}

	onNo(){
		this.props.fieldUpdate({ field: "ChairWarning", value: "No" });
		Actions.pdiBegin();
	}

	render(){
		return (
			<ScrollView>
				<Timer />
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
	return {};
};

export default connect(mapStateToProps, { fieldUpdate })(PDIChairWarning);