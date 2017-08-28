import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import { fieldUpdate } from '../../../actions';
import { CardSection, Multiline, Button } from '../../common';
import IncDecInput from '../../IncDecInput';
import { CheckStyle } from '../../../styles';
import Timer from '../../Timer';

class PDIParentConfirm extends Component{
  onComplete(){
    Actions.pdiBegin();
  }

  render(){
    return (
      <ScrollView>
        <Timer />
        <CardSection style={{ flexDirection: 'column' }}>
          <CheckBox
            label="Parent Say Ok"
            size={30}
            iconStyle={CheckStyle}
            checked={this.props.fields.ParentConfirm}
            onPress={value => this.props.fieldUpdate({ field: 'ParentConfirm', value })}
          />
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
  const { fields } = state.form;
  return { fields };
}

export default connect(mapStateToProps, { fieldUpdate })(PDIParentConfirm);