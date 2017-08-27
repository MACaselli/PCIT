import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import { formCreate, fieldUpdate } from '../../../actions';
import { CardSection, Multiline, Button } from '../../common';
import IncDecInput from '../../IncDecInput';
import { HeaderStyle } from '../../../styles';
import Timer from '../../Timer';

class PDISummary extends Component{
  onComplete(){
    const { uid, sessionid, attendee, type, fields } = this.props;

    this.props.formCreate({ uid, sessionid, attendee, type, fields });
    Actions.pop();
  }

  render(){
    return (
      <ScrollView>
        <Timer />
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={HeaderStyle}>
            Summary
          </Text>
        </CardSection>
        <CardSection>
          <Button onPress={this.onComplete.bind(this)}>
            Complete
          </Button>
        </CardSection>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const { uid } = state.clientForm;
  const sessionid = state.session.index;
  const { attendee, type, fields } = state.form;

  return { uid, sessionid, attendee, type, fields };
}

export default connect(mapStateToProps, { formCreate, fieldUpdate })(PDISummary);