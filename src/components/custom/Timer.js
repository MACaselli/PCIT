import React, { Component } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Entypo";
import { CardSection, Button } from "common";
import { timerStart, timerStop, timerReset } from "actions";


class Timer extends Component{
	componentWillUnmount(props){
		const { resetOnUnmount, instance, timerStop, timerReset } = this.props;
		if (resetOnUnmount){
			timerStop(instance);
			timerReset(instance);
		}
	}

	render(){
		const { instance } = this.props;
		var { time } = this.props.timers[instance];
		time = `${Math.floor(time / 60)}:${(time % 60 >= 10) ? (time % 60) : `0${time % 60}`}`; // zero-fill
		return(
			<CardSection style={{ flexDirection: "row", alignItems: "center", paddingTop: 0, paddingBottom: 5 }}>
				<Button style={{ flex: 1 }} onPress={() => this.props.timerStart(instance)}><Icon name="controller-play" size={20} /></Button>
				<Button style={{ flex: 1 }} onPress={() => this.props.timerStop(instance)}><Icon name="controller-paus" size={20} /></Button>
				<Button style={{ flex: 1 }} onPress={() => this.props.timerReset(instance)}><Icon name="loop" size={20} /></Button>
				<Text style={{ flex: 2, textAlign: "center", fontSize: 20 }}>{time}</Text>
			</CardSection>
		);
	}
}

const mapStateToProps = (state) => {
	const { timers } = state.form;
	return { timers };
};
const Timer_Connected = connect(mapStateToProps, { timerStart, timerStop, timerReset })(Timer);

export { Timer_Connected as Timer };