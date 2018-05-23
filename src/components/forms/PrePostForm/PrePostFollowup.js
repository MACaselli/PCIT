import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { SegmentedControls } from "react-native-radio-buttons";
import { formCreate, fieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Multiline, Timer } from "custom";
import { HeaderStyle } from "styles";

class PrePostFollowup extends Component{
	onComplete(){
		const { uid, sessionid, attendee, type, fields } = this.props;

		this.props.formCreate({ uid, sessionid, attendee, type, fields });
		Actions.pop();
	}

	setSelectedOption(selectedOption){
		this.props.fieldUpdate({ field: "interactionTypical", value: selectedOption });
	}

	render(){
		// Why is update triggered by nested property change? (state.forms.interaction)
		const options = ["Yes", "No"];
		return (
			<View style={{ flex: 1 }}>
				<View>
					<Timer instance={0} />
				</View>
				<ScrollView>
					<CardSection style={{ flexDirection: "column" }}>
						<Text style={HeaderStyle}>Was the interaction typical?</Text>
						<SegmentedControls
							options={ options }
							onSelection={ this.setSelectedOption.bind(this) }
							selectedOption={ this.props.fields.interactionTypical }
							optionStyle={{ fontSize: 18 }}
						/>
					</CardSection>

					<CardSection>
						<Multiline
							label="Notes"
						/>
					</CardSection>

					<CardSection>
						<Button onPress={this.onComplete.bind(this)}>
              Complete
						</Button>
					</CardSection>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { uid } = state.clientForm;
	const sessionid = state.session.index;
	const { attendee, type, fields } = state.form;

	return { uid, sessionid, attendee, type, fields };
};

export default connect(mapStateToProps, { formCreate, fieldUpdate })(PrePostFollowup);