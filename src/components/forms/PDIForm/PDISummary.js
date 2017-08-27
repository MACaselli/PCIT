import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import { formCreate, fieldUpdate } from '../../../actions';
import { CardSection, Multiline, Button } from '../../common';
import IncDecInput from '../../IncDecInput';
import { HeaderStyle, SubHeaderStyle } from '../../../styles';
import Timer from '../../Timer';

class PDISummary extends Component{
  onComplete(){
    const { uid, sessionid, attendee, type, fields } = this.props;

    this.props.formCreate({ uid, sessionid, attendee, type, fields });
    Actions.pop();
  }

  render(){
    const HeaderStyleModified = {...HeaderStyle, fontSize: 18}
    return (
      <ScrollView>
        <Timer />
        <CardSection style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              DC or IC?
            </Text>
            <Text style={SubHeaderStyle}>
              DC
            </Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              Effective?
            </Text>
            <Text style={SubHeaderStyle}>
              Yes
            </Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              No Opp
            </Text>
            <Text style={SubHeaderStyle}>
              No
            </Text>
          </View>
        </CardSection>

        <CardSection style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              Obey / Disobey?
            </Text>
            <Text style={SubHeaderStyle}>
              Disobey
            </Text>
          </View>
        </CardSection>

        <CardSection style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              LP / UP?
            </Text>
            <Text style={SubHeaderStyle}>
              N/A
            </Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              Chair Warning
            </Text>
            <Text style={SubHeaderStyle}>
              Yes
            </Text>
          </View>
        </CardSection>

        <CardSection style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              Obey / Disobey?
            </Text>
            <Text style={SubHeaderStyle}>
              Disobey
            </Text>
          </View>
        </CardSection>

        <CardSection style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              LP / UP?
            </Text>
            <Text style={SubHeaderStyle}>
              N/A
            </Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              To Chair
            </Text>
            <Text style={SubHeaderStyle}>
              1
            </Text>
          </View>
        </CardSection>

        <CardSection style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              Stay / Go?
            </Text>
            <Text style={SubHeaderStyle}>
              Stays on
            </Text>
          </View>
        </CardSection>

        <CardSection style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              Obey / Disobey?
            </Text>
            <Text style={SubHeaderStyle}>
              Obey
            </Text>
          </View>
        </CardSection>

        <CardSection style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              Acknowledge
            </Text>
            <Text style={SubHeaderStyle}>
              Yes
            </Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              To Room
            </Text>
            <Text style={SubHeaderStyle}>
              No
            </Text>
          </View>
        </CardSection>

        <CardSection style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Text style={HeaderStyleModified}>
              Effective Sequence
            </Text>
            <Text style={SubHeaderStyle}>
              Yes
            </Text>
          </View>
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