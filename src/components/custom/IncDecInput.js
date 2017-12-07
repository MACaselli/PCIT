import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

class IncDecInput extends Component{
	render(){
		const { label, value, onChangeText, onInc, onDec } = this.props;

		return (
			<View style={styles.containerStyle}>
				<Text style={styles.labelStyle}>{label}</Text>
				<TextInput
					value={value}
					placeholder="0"
					keyboardType="numeric"
					style={styles.inputStyle}
					onChangeText={onChangeText}
				/>

				<TouchableOpacity style={styles.buttonStyle} onPress={onDec}>
					<Text style={styles.textStyle}>-</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.buttonStyle} onPress={onInc}>
					<Text style={styles.textStyle}>+</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		height: 40,
		marginTop: 5,
		marginBottom: 5,
		flexDirection: "row",
		alignItems: "center"
	},
	labelStyle: {
		fontSize: 18,
		paddingLeft: 20,
		flex: 3
	},
	inputStyle: {
		marginRight: 20,
		marginLeft: 20,
		fontSize: 18,
		lineHeight: 23,
		textAlign: "center",
		flex: 1
	},
	buttonStyle: {
		alignSelf: "stretch",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#007aff",
		marginLeft: 5,
		marginRight: 5,
		flex: 1
	},
	textStyle: {
		alignSelf: "center",
		color: "#007aff",
		fontSize: 24,
	}
};

export { IncDecInput };