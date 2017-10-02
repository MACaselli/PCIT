import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { CardSection, Button } from 'common';
import { timerStart, timerStop, timerReset } from 'actions';


class Timer extends Component{
  render(){
    const { label, value, onChangeText } = this.props;
    var { timer } = this.props;
    timer = `${Math.floor(timer / 60)}:${(timer % 60 >= 10) ? (timer % 60) : `0${timer % 60}`}`; // zero-fill
    return(
    	<CardSection style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 0, paddingBottom: 5 }}>
            <Button style={{ flex: 1 }} onPress={this.props.timerStart}><Icon name="controller-play" size={20} /></Button>
            <Button style={{ flex: 1 }} onPress={this.props.timerStop}><Icon name="controller-paus" size={20} /></Button>
            <Button style={{ flex: 1 }} onPress={this.props.timerReset}><Icon name="loop" size={20} /></Button>
    		<Text style={{ flex: 2, textAlign: 'center', fontSize: 20 }}>{timer}</Text>
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