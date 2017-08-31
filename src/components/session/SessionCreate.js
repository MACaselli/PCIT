import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Slider, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import DatePicker from 'react-native-datepicker';
import { sessionCreate, sessionUpdate, sessionDelete, sessionReset } from 'actions';
import { Card, CardSection, Button, Input } from 'common';
import { IncDecInput, SliderInput } from 'custom';
import { HeaderStyle, SubHeaderStyle } from 'styles';
import SessionForm from 'components/session/SessionForm';

class SessionCreate extends Component {
  componentWillMount() {
    this.props.sessionReset();
    const date = new Date();
    this.props.sessionUpdate({ prop: 'date', value: `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}` })
  }    

  onCreatePress(){
    const { uid, date, daysofhomework, ecbiscores } = this.props
    this.props.sessionCreate({ uid, date, daysofhomework, ecbiscores });
  }

  render() {
    return (
      <ScrollView>
        <Card>
          <SessionForm />
          
          <CardSection>
            <Button onPress={this.onCreatePress.bind(this)}>
              Session Complete
            </Button>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { uid, guardians } = state.clientForm;
  const { date } = state.session;
  var { daysofhomework, ecbiscores } = state.session;

  return { uid, date, daysofhomework, ecbiscores };
};

export default connect(mapStateToProps, { sessionCreate, sessionUpdate, sessionReset })(SessionCreate);
