import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SegmentedControls } from 'react-native-radio-buttons'
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
    const options = ['DC', 'IC']
    return (
      <ScrollView>
        <Timer />
        
        <View style={{ flexDirection: 'column' }}> 
          <SegmentedControls
            options={ options }
            optionStyle={{ fontSize: 18 }}
          />
        </View>

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