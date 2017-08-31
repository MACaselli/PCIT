import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import { SegmentedControls } from 'react-native-radio-buttons'
import { formCreate, fieldUpdate } from 'actions';
import { CardSection, Button } from 'common';
import { Multiline, Timer } from 'custom';
import { HeaderStyle } from 'styles';

class CDIFollowup extends Component{
  onComplete(){
    const { uid, sessionid, attendee, type, fields } = this.props;

    this.props.formCreate({ uid, sessionid, attendee, type, fields });
    Actions.pop();
  }

  render(){
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Timer />
        </View>
        <ScrollView>
          <CardSection style={{ flexDirection: 'column', paddingLeft: 10, paddingRight: 10 }}> 
            <Text style={{ ...HeaderStyle, textAlign: 'center', paddingBottom: 5 }}>Imitate</Text>
            <SegmentedControls
              direction={'row'}
              options={['Satisfactory', 'Needs Practice']}
              onSelection={ value => this.props.fieldUpdate({ field: 'imitate', value }) }
              selectedOption={ this.props.fields.imitate }
              optionStyle={{ fontSize: 18 }}
            />
          </CardSection>

          <CardSection style={{ flexDirection: 'column', paddingLeft: 10, paddingRight: 10 }}> 
            <Text style={{ ...HeaderStyle, textAlign: 'center', paddingBottom: 5 }}>Use Enthusiasm</Text>
            <SegmentedControls
              direction={'row'}
              options={['Satisfactory', 'Needs Practice']}
              onSelection={ value => this.props.fieldUpdate({ field: 'useEnthusiasm', value }) }
              selectedOption={ this.props.fields.useEnthusiasm }
              optionStyle={{ fontSize: 18 }}
            />
          </CardSection>

          <CardSection style={{ flexDirection: 'column', paddingLeft: 10, paddingRight: 10 }}> 
            <Text style={{ ...HeaderStyle, textAlign: 'center', paddingBottom: 5 }}>Ignore Disruptive Behavior</Text>
            <SegmentedControls
              direction={'column'}
              options={['Satisfactory', 'Needs Practice', 'Not Applicable']}
              onSelection={ value => this.props.fieldUpdate({ field: 'ignoreDisruptiveBehavior', value }) }
              selectedOption={ this.props.fields.ignoreDisruptiveBehavior }
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

const styles = {
  checkStyle: {
    marginRight: 7,
    marginLeft: 7,
  },
  headerStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
    fontSize: 20
  },
  subHeaderStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
    fontSize: 17
  }
};

const mapStateToProps = (state) => {
  const { uid } = state.clientForm;
  const sessionid = state.session.index;
  const { attendee, type, fields } = state.form;

  return { uid, sessionid, attendee, type, fields };
}


export default connect(mapStateToProps, { formCreate, fieldUpdate })(CDIFollowup);