import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { sessionCreate, sessionUpdate, sessionReset } from '../../actions';
import { Card, CardSection, Button, Input } from '../common';
import IncDecInput from '../IncDecInput';
import { HeaderStyle, SubHeaderStyle } from '../../styles';

class SessionInfo extends Component {
  componentWillMount() {
    this.fillSessionWithInfo();
  }

  fillSessionWithInfo(){
    this.props.sessionReset();
    _.each(this.props.session, (value, prop) => {
      this.props.sessionUpdate({ prop, value });
    });

    // Fix to prevent overwriting.
    const date = new Date();
    this.props.sessionUpdate({ prop: 'date', value: `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}` })
  }

  onCodingPress(){
    Actions.codingChoice();
  }

  onCreatePress(){
    const { uid, date, daysofhomework, ecbiscores } = this.props
    this.props.sessionCreate({ uid, date, daysofhomework, ecbiscores });
  }

  handleDOH(index, value){
    var { daysofhomework } = this.props;
    daysofhomework[index].Days = parseInt(value);
    this.props.sessionUpdate({ prop: 'daysofhomework', value: daysofhomework });
  }

  handleECBI(index, type, value){
    var { ecbiscores } = this.props;
    if (!ecbiscores[index]){
      ecbiscores[index] = {}; // Create object if non-existant.
    }
    ecbiscores[index][type] = parseInt(value);
    this.props.sessionUpdate({ prop: 'ecbiscores', value: ecbiscores });
  }

  render() {
    const { date, forms_list, guardians, daysofhomework_list, ecbiscores_list } = this.props;
    return (
      <ScrollView>
        <Card>
          <CardSection>
            <Input
              label="Date"
              placeholder="mm/dd/yyyy"
              value={date}
              onChangeText={value => this.props.sessionUpdate({ prop: 'date', value })}
            />
          </CardSection>

          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={HeaderStyle}>Days of Homework Completed</Text>
            {
              _.map(guardians, (guardian, index) => {
                return (
                  <IncDecInput 
                    label={guardian.name}
                    value={`${daysofhomework_list[index]}`}
                    onChangeText={value => this.handleDOH.call(this, index, value)}
                  />
                )
              })
            }
          </CardSection>

          <View style={{ flexDirection: 'column' }}> 
            <Text style={HeaderStyle}>ECBI Score</Text>
            {
              _.map(guardians, (guardian, index) => {
                return (
                  <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={SubHeaderStyle}>{guardian.name}</Text>
                    <IncDecInput 
                      label="Intensity"
                      value={`${ecbiscores_list[index][0]}`}
                      onChangeText={value => this.handleECBI.call(this, index, 'Intensity', value)}
                    />
                    <IncDecInput 
                      label="Problem" 
                      value={`${ecbiscores_list[index][1]}`}
                      onChangeText={value => this.handleECBI.call(this, index, 'Problem', value)}
                    />
                  </CardSection>
                )
              })
            }
          </View>

          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={HeaderStyle}>Completed Forms:</Text>
            {
              _.map(forms_list, (formType) => {
                return (
                  <Text style={SubHeaderStyle}>{formType}</Text>
                )
              })
            }
          </CardSection>

          <CardSection>
            <Button onPress={this.onCodingPress}>
              Add Coding
            </Button>
          </CardSection>

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
  const { date, forms } = state.session;
  var { daysofhomework, ecbiscores } = state.session;

  // Create default values to prevent binding value to an undefined property.
  if(!Object.keys(daysofhomework).length){
    _.map(guardians, (guardian, index) => {
      daysofhomework[index] = { Days: 0 };
    });
  }
  if(!Object.keys(ecbiscores).length){
    _.map(guardians, (guardian, index) => {
      ecbiscores[index] = { Intensity: 0, Problem: 0 }
    })
  }

  // React doesn't detect object property changes as component prop changes, so objects must be converted to lists.
  forms_list = _.map(forms, (form) => {
    return form.type;
  });
  daysofhomework_list = _.map(daysofhomework, (guardian) => {
    return guardian.Days;
  })
  ecbiscores_list = _.map(ecbiscores, (guardian) => {
    return [guardian.Intensity, guardian.Problem];
  })

  return { guardians, uid, date, forms_list, daysofhomework, ecbiscores, daysofhomework_list, ecbiscores_list };
};

export default connect(mapStateToProps, { sessionCreate, sessionUpdate, sessionReset })(SessionInfo);
