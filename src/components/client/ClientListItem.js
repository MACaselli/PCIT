import React, { Component } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { CardSection } from "common";

class ClientListItem extends Component {
	onRowPress() {
		Actions.clientEdit({ client: this.props.client });
	}

	render() {
		const { name } = this.props.client;

		return (
			<TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
				<View>
					<CardSection>
						<Text style={styles.titleStyle}>
							{name}
						</Text>
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

export default ClientListItem;
