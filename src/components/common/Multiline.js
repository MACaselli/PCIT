import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './CardSection';


class Multiline extends Component{
  render(){
    const { label, value, onChangeText } = this.props;

    return(
      <View style={styles.containerStyle}>
        <View style={styles.subContainerStyle}>
          <Text style={styles.textStyle}>{label}</Text>
        </View>
        <View style={styles.subContainerStyle}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            multiline={true}
            maxLength={500}
            style={styles.inputStyle}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'column',
    flex: 1
  },
  subContainerStyle: {
    marginLeft: 20,
    marginRight: 20
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1
  },
  inputStyle: {
    height: 100,
    paddingLeft: 5,
    paddingRight: 5,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    fontSize: 18,
    flex: 1
  }
}

export { Multiline };