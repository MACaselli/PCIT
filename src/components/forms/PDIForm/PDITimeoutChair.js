import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import { fieldUpdate } from 'actions';
import { CardSection, Button } from 'common';
import { Multiline, IncDecInput, Timer } from 'custom';
import { HeaderStyle } from 'styles';

class PDITimeoutChair extends Component{
  onStay(){
    this.props.fieldUpdate({ field: 'TimeoutChair', value: 'Stays on' });
    Actions.pdiChildReady();
  }

  onGetOff(){
    this.props.fieldUpdate({ field: 'TimeoutChair', value: 'Gets off' });
    Actions.pdiTimeoutRoom();
  }

  onNoResponse(){
    this.props.fieldUpdate({ field: 'TimeoutChair', value: 'No response' });
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
        <Timer />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, { fieldUpdate })(PDITimeoutChair);