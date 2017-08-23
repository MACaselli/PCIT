import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import { fieldUpdate } from '../../../actions';
import { CardSection, Multiline, Button } from '../../common';
import IncDecInput from '../../IncDecInput';
import { HeaderStyle, CheckStyle } from '../../../styles';
import Timer from '../../Timer';

class PDIBegin extends Component{
  onNext(){
    Actions.pdiObey1();
  }

  onComplete(){
    Actions.pdiSummary();
  }

  render(){
    return (
      <ScrollView>
        <Timer />
        
        <CardSection style={{ flexDirection: 'column' }}>
          <CheckBox
            label="DC"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            iconStyle={CheckStyle}
          />
          <CheckBox
            label="IC"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            iconStyle={CheckStyle}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <CheckBox
            label="Effective"
            size={30}
            iconStyle={CheckStyle}
          />
          <CheckBox
            label="No Opportunity"
            size={30}
            iconStyle={CheckStyle}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.onNext.bind(this)}>
            Next
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onComplete.bind(this)}>
            Complete Coding
          </Button>
        </CardSection>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, { fieldUpdate })(PDIBegin);