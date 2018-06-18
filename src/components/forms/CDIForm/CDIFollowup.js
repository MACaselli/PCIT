import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { SegmentedControls } from "react-native-radio-buttons";
import { formCreate, fieldUpdate } from "actions";
import { CardSection, Button } from "common";
import { Multiline, Timer } from "custom";
import { HeaderStyle } from "styles";

class CDIFollowup extends Component{
	componentWillUnmount(){
		const { uid, sessionid, attendee, type, fields } = this.props;
		this.props.formCreate({ uid, sessionid, attendee, type, fields });
	}

	onComplete(){
		Actions.pop();
	}

	render(){
		const { time } = this.props;
		return (
			<View style={{ flex: 1 }}>
				<View>
					<Timer instance={0} resetOnUnmount={true} />
				</View>
				<ScrollView>
					<CardSection style={{ flexDirection: "column", paddingLeft: 10, paddingRight: 10 }}> 
						<Text style={{ ...HeaderStyle, textAlign: "center", paddingBottom: 5 }}>Imitate</Text>
						<SegmentedControls
							direction={"row"}
							options={["Satisfactory", "Needs Practice"]}
							onSelection={ value => this.props.fieldUpdate({ field: "imitate", value: { value, time } }) }
							selectedOption={ this.props.fields.imitate.value }
							optionStyle={{ fontSize: 18 }}
						/>
					</CardSection>

					<CardSection style={{ flexDirection: "column", paddingLeft: 10, paddingRight: 10 }}> 
						<Text style={{ ...HeaderStyle, textAlign: "center", paddingBottom: 5 }}>Use Enthusiasm</Text>
						<SegmentedControls
							direction={"row"}
							options={["Satisfactory", "Needs Practice"]}
							onSelection={ value => this.props.fieldUpdate({ field: "useEnthusiasm", value: { value, time } }) }
							selectedOption={ this.props.fields.useEnthusiasm.value }
							optionStyle={{ fontSize: 18 }}
						/>
					</CardSection>

					<CardSection style={{ flexDirection: "column", paddingLeft: 10, paddingRight: 10 }}> 
						<Text style={{ ...HeaderStyle, textAlign: "center", paddingBottom: 5 }}>Ignore Disruptive Behavior</Text>
						<SegmentedControls
							direction={"column"}
							options={["Satisfactory", "Needs Practice", "Not Applicable"]}
							onSelection={ value => this.props.fieldUpdate({ field: "ignoreDisruptiveBehavior", value: { value, time } }) }
							selectedOption={ this.props.fields.ignoreDisruptiveBehavior.value }
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
	const { attendee, type, fields, timers } = state.form;

	return { uid, sessionid, attendee, type, fields, time: timers[0].time };
};


export default connect(mapStateToProps, { formCreate, fieldUpdate })(CDIFollowup);