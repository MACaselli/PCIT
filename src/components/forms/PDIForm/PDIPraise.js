import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { pdiFieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";

class PDIPraise extends Component{
	onLP(){
		this.props.pdiFieldUpdate({ field: "Praise", value: "LP" });
		Actions.pdiBegin();
	}

	onUP(){
		this.props.pdiFieldUpdate({ field: "Praise", value: "UP" });
		Actions.pdiBegin();   
	}

	onNoResponse(){
		this.props.pdiFieldUpdate({ field: "Praise", value: "No response" });
		Actions.pdiBegin();   
	}

	render(){
		return (
			<ScrollView>
				<Timer instance={0} />
				<CardSection>
					<Button onPress={this.onLP.bind(this)}>
            Labeled Praise (LP)
					</Button>
				</CardSection>
				<CardSection>
					<Button onPress={this.onUP.bind(this)}>
            Unlabeled Praise (UP)
					</Button>
				</CardSection>
				<CardSection>
					<Button onPress={this.onNoResponse.bind(this)}>
            No Response
					</Button>
				</CardSection>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, { pdiFieldUpdate })(PDIPraise);