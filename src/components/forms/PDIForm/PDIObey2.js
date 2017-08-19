import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import { fieldUpdate } from '../../../actions';
import { CardSection, Multiline, Button } from '../../common';
import IncDecInput from '../../IncDecInput';
import Timer from '../../Timer';

class PDIObey2 extends Component{
  onObey(){
    Actions.pdiPraise();
  }

  onDisobey(){
    Actions.pdiTimeoutChair();
  }

  render(){
    return (
      <ScrollView>
        <Timer />
        <CardSection>
          <Button onPress={this.onObey.bind(this)}>
            Obey
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onDisobey.bind(this)}>
            Disobey
          </Button>
        </CardSection>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, { fieldUpdate })(PDIObey2);