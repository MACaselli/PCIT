import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import { fieldUpdate } from '../../../actions';
import { CardSection, Multiline, Button } from '../../common';
import IncDecInput from '../../IncDecInput';
import Timer from '../../Timer';

class PDIPraise extends Component{
  onLP(){
    Actions.pdiBegin();
  }

  onUP(){
    Actions.pdiBegin();   
  }

  onNoResponse(){
    Actions.pdiBegin();   
  }

  render(){
    return (
      <ScrollView>
        <Timer />
        <CardSection>
          <Button onPress={this.onLP.bind(this)}>
            Labeled Praise (LP)
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onUP.bind(this)}>
            Unlabeled Praise (UP)
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onNoResponse.bind(this)}>
            No Response
          </Button>
        </CardSection>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, { fieldUpdate })(PDIPraise);