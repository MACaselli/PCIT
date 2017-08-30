import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SegmentedControls } from 'react-native-radio-buttons'
import CheckBox from 'react-native-icon-checkbox';
import _ from 'lodash';
import { formCreate, fieldUpdate } from '../../../actions';
import { CardSection, Multiline, Button } from '../../common';
import { HeaderStyle } from '../../../styles';
import IncDecInput from '../../IncDecInput';
import Timer from '../../Timer';

class PrePostFollowup extends Component{
  onComplete(){
    const { uid, sessionid, attendee, type, fields } = this.props;

    this.props.formCreate({ uid, sessionid, attendee, type, fields });
    Actions.pop();
  }

  setSelectedOption(selectedOption){
    this.props.fieldUpdate({ field: 'interactionTypical', value: selectedOption });
  }

  render(){
    // Why is update triggered by nested property change? (state.forms.interaction)
    const options = ['Yes', 'No'];
    return (
      <View>
        <View style={{ flex: 1 }}>
          <Timer />
        </View>
        <ScrollView>
          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={HeaderStyle}>Was the interaction typical?</Text>
            <SegmentedControls
              options={ options }
              onSelection={ this.setSelectedOption.bind(this) }
              selectedOption={ this.props.fields.interactionTypical }
              optionStyle={{ fontSize: 18 }}
            />
          </CardSection>

          <CardSection>
            <Multiline
              label="Notes"
            />
          </CardSection>

          <CardSection>
            <Button onPress={this.onComplete.bind(this)}>
              Complete
            </Button>
          </CardSection>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { uid } = state.clientForm;
  const sessionid = state.session.index;
  const { attendee, type, fields } = state.form;

  return { uid, sessionid, attendee, type, fields };
}

export default connect(mapStateToProps, { formCreate, fieldUpdate })(PrePostFollowup);