import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SegmentedControls } from "react-native-radio-buttons";
import { CardSection } from "common";

function Field({ text }){
	return (
		<TouchableOpacity style={styles.buttonStyle}>
			<Text style={styles.textStyle}>{text}</Text>
			<Text style={styles.textStyle}>0</Text>
		</TouchableOpacity>);
}

class CodingGrid extends Component{
	render(){
		let fields = [["Neutral Talk", "Behavior Description", "Reflection"],
			["Labeled Praise", "Unlabeled Prais"],
			["Question", "Negative Talk"],
			["DC Comply", "DC Noncomply", "DC No Opportunity"],
			["IDC Comply", "IDC Noncomply", "IDC No Opportunity"]];

		return (
			<View style={{ flexDirection: "column", flex: 1 }}>
				<View style={styles.containerStyle}>
					{ fields.map(section => {
						return (<View style={styles.subContainerStyle}>
							{
								section.map(text => {
									return <Field text={text} />;
								})
							}
						</View>);
					})}
				</View>

				<View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5 }}>
					<SegmentedControls
						direction={"row"}
						options={ ["Add", "Subtract"] }
						optionStyle={{ fontSize: 18 }}
					/>
				</View>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		flex: 1
	},
	subContainerStyle: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1
	},
	buttonStyle: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "stretch",
		borderWidth: 0.5,
		borderColor: "#007aff",
		backgroundColor: "#fff"
	},
	textStyle: {
		fontSize: 16,
		textAlign: "center",
		flex: 1
	}
};

export { CodingGrid };