import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { fieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";

class PDIObey3 extends Component{
	onObey(){
		this.props.fieldUpdate({ field: "Obey3", value: "Obey" });
		Actions.pdiParentConfirm();
	}

	onDisobey(){
		this.props.fieldUpdate({ field: "Obey3", value: "Disobey" });
		Actions.pdiTimeoutChair();
	}

	onNoResponse(){
		this.props.fieldUpdate({ field: "Obey3", value: "No response" });
		Actions.pdiBegin();
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
				<CardSection>
					<Button onPress={this.onNoResponse.bind(this)}>
            No Caregiver Response
					</Button>
				</CardSection>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, { fieldUpdate })(PDIObey3);