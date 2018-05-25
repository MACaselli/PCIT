import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { pdiFieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Timer } from "custom";

class PDIObey1 extends Component{
	onObey(){
		this.props.pdiFieldUpdate({ field: "Obey1", value: "Obey" });
		Actions.pdiPraise();
	}

	onDisobey(){
		this.props.pdiFieldUpdate({ field: "Obey1", value: "Disobey" });
		Actions.pdiChairWarning();
	}

	onComplete(){
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
					<Button onPress={this.onComplete.bind(this)}>
            Complete Sequence
					</Button>
				</CardSection>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps, { pdiFieldUpdate })(PDIObey1);