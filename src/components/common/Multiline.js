import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './CardSection';


class Multiline extends Component{
  constructor(props){
    super(props);

    this.state = {
      height: 45
    }

    this.updateSize = this.updateSize.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const { value } = nextProps;

    if (value != this.props.value){
      this.updateSize(value);
    }
  }

  updateSize(text){
    const lines = text.split('\n').length;
    this.setState(() => { return { height: 45 + (20 * lines) }});
  }

  handleFocus(){
    const { value } = this.props

    if (value){
      this.updateSize(this.props.value);
    }
  }

  handleBlur(){
    this.setState(() => { return { height: 45 } });
  }

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
            style={{...styles.inputStyle, height: this.state.height}}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
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
    paddingLeft: 5,
    paddingRight: 5,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    fontSize: 18,
    flex: 1
  }
}

export { Multiline };