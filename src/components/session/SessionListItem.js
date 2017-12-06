import React, { Component } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import { CardSection } from "common";

class SessionListItem extends Component {
	onRowPress() {
		const { session } = this.props;
		Actions.sessionInfo({ session });
	}

	render() {
		const { forms, date } = this.props.session;
		const forms_list = _.map(forms, (form) => {
			return form.type;
		});

		return (
			<TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
				<View>
					<CardSection style={{ flexDirection: "row" }}>
						<View style={{ flex: 1 }}>
							<Text style={styles.titleStyle}>
								{date}
							</Text>
						</View>
						<View style={{ flexDirection: "column", flex: 1 }}>
							{
								_.map(forms_list, (formType) => {
									return (
										<Text style={styles.titleStyle}>
											{formType}
										</Text>
									);
								})
							}
						</View>
					</CardSection>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = {
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15
	}
};

const mapStateToProps = (state) => {
	return {};
};

export default connect(mapStateToProps)(SessionListItem);
