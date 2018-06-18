import React, { Component } from "react";
import { Text, View, Modal } from "react-native";
import { CardSection, Button, Input } from "common";

class DirSelect extends Component  {
	state = { field: "" }

	updatePath(field){
		this.setState({ field });
	}

	render(){
		const { children, visible, onAccept, onDecline } = this.props;
		const { containerStyle, textStyle, cardSectionStyle } = styles;

		return (
			<Modal
				visible={visible}
				transparent
				animationType="slide"
				onRequestClose={() => {}}
			>
				<View style={containerStyle}>
					<CardSection style={cardSectionStyle}>
						<Text style={textStyle}>
							{children}
						</Text>
					</CardSection>

					<CardSection style={cardSectionStyle}>
						<Input
							label="Path"
							placeholder="new.csv"
							value={this.state.field}
							onChangeText={this.updatePath.bind(this)}
						/>
					</CardSection>

					<CardSection>
						<Button onPress={onAccept.bind(null, this.state.field)}>Yes</Button>
						<Button onPress={onDecline}>No</Button>
					</CardSection>
				</View>
			</Modal>
		);
	}	
};

const styles = {
	cardSectionStyle: {
		justifyContent: "center"

	},
	textStyle: {
		flex: 1,
		fontSize: 18,
		textAlign: "center",
		lineHeight: 40
	},
	containerStyle: {
		backgroundColor: "rgba(0, 0, 0, 0.75)",
		position: "relative",
		flex: 1,
		justifyContent: "center"
	}
};

export { DirSelect };
