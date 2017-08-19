import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import { fieldUpdate } from '../../../actions';
import { CardSection, Multiline, Button } from '../../common';
import IncDecInput from '../../IncDecInput';
import { HeaderStyle } from '../../../styles';
import Timer from '../../Timer';

class PDIChairWarning extends Component{
  onYes(){
    Actions.pdiObey2();
  }

  onNo(){
    Actions.pdiBegin();
  }

  render(){
    return (
      <ScrollView>
        <Timer />
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={HeaderStyle}>
            Chair Warning
          </Text>
        </CardSection>
             
        <CardSection>
          <Button onPress={this.onYes.bind(this)}>
            Yes
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onNo.bind(this)}>
            No
          </Button>
        </CardSection>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, { fieldUpdate })(PDIChairWarning);