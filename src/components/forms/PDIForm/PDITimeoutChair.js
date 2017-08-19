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

class PDITimeoutChair extends Component{
  onStay(){
    Actions.pdiChildReady();
  }

  onGetOff(){
    Actions.pdiTimeoutRoom();
  }

  onNoResponse(){
    Actions.pdiBegin();
  }

  render(){
    return (
      <ScrollView>
        <Timer />
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={HeaderStyle}>
            Time-out Chair
          </Text>
        </CardSection>

        <CardSection>
          <Button onPress={this.onStay.bind(this)}>
            Stays On
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onGetOff.bind(this)}>
            Gets Off
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onNoResponse.bind(this)}>
            No Caregiver Response
          </Button>
        </CardSection>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, { fieldUpdate })(PDITimeoutChair);