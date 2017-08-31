import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Button } from 'common';
import { timerStart, timerStop, timerReset } from 'actions';


class Timer extends Component{
  render(){
    const { label, value, onChangeText } = this.props;
    var { timer } = this.props;
    timer = `${Math.floor(timer / 60)}:${(timer % 60 >= 10) ? (timer % 60) : `0${timer % 60}`}`;
    return(
    	<CardSection style={{ flexDirection: 'column' }}>
    		<Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 }}>{timer}</Text>
    		<View style={{ flexDirection: 'row' }}>
	    		<Button style={{ flex: 1 }} onPress={this.props.timerStart}>Start</Button>
	    		<Button style={{ flex: 1 }} onPress={this.props.timerStop}>Stop</Button>
	    		<Button style={{ flex: 1 }} onPress={this.props.timerReset}>Reset</Button>
    		</View>
    	</CardSection>
    )
  }
}

const mapStateToProps = (state) => {
	const { timer } = state.form;
	return { timer };
}
const Timer_Connected = connect(mapStateToProps, { timerStart, timerStop, timerReset })(Timer);

export { Timer_Connected as Timer };