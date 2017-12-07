import React, { Component } from "react";
import { View, Text, Slider, TextInput } from "react-native";

class SliderInput extends Component{
	render(){
		const { label, value, maximumValue, minimumValue, step, onChangeText, onSlidingComplete } = this.props;

		return (
			<View style={styles.containerStyle}>
				<Text style={{ ...styles.labelStyle, flex: 2 }}>{label}</Text>
				<View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
					<Slider
						value={value}
						onSlidingComplete={onSlidingComplete}
						maximumValue={maximumValue}
						minimumValue={minimumValue}
						step={step}
						style={{ flex: 9 }} 
					/>
					<TextInput 
						value={`${value}`}
						onChangeText={onChangeText}
						style={{ ...styles.inputStyle, flex: 1 }} 
					/>
				</View>
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		height: 70,
		marginTop: 5,
		marginBottom: 5,
		paddingLeft: 20,
		paddingRight: 20,
		flexDirection: "column",
		alignItems: "center"
	},
	inputStyle: {
		fontSize: 18,
		lineHeight: 23,
		textAlign: "center",
	},
	labelStyle: {
		fontSize: 18,
	}
};

export { SliderInput };