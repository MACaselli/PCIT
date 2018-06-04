import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

class IncDecInput extends Component{
	constructor(props){
		super(props);
		this.handleInc = this.handleInc.bind(this);
		this.handleDec = this.handleDec.bind(this);
	}

	handleInc(){
		const { value, maximumValue, onChangeText } = this.props;
		if (typeof maximumValue === "undefined" || value < maximumValue){
			onChangeText(parseInt(value) + 1);
		}
	}

	handleDec(){
		const { value, minimumValue, onChangeText } = this.props;
		if (typeof minimumValue === "undefined" || value > minimumValue){
			onChangeText(parseInt(value) - 1);
		}
	}

	render(){
		const { label, value, onChangeText } = this.props;

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

				<TouchableOpacity style={styles.buttonStyle} onPress={this.handleDec}>
					<Text style={styles.textStyle}>-</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.buttonStyle} onPress={this.handleInc}>
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