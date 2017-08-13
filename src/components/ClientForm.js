import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { clientUpdate } from '../actions/ClientActions';
import { CardSection, Input, Button } from './common';
import { PickerLabelStyle } from '../styles';


class ClientForm extends Component {
  handleGuardians(value, index){
    var guardians = { ...this.props.guardians }; // Creating a direct copy results in "Cannot modify managed object outside of write transaction"
    guardians[index].name = value;
    this.props.clientUpdate({ prop: 'guardians', value: guardians });
  }

  addGuardian(){
    var guardians = { ...this.props.guardians };
    const new_index = Math.max.apply(null, Object.keys(guardians)) + 1; // Get the new index for adding a new guardian object
    guardians[new_index] = { name: '' }
    this.props.clientUpdate({ prop: 'guardians', value: guardians });
  }

  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="client name"
            value={this.props.name}
            onChangeText={value => this.props.clientUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="DOB"
            placeholder="mm/dd/yyyy"
            value={this.props.DOB}
            onChangeText={value => this.props.clientUpdate({ prop: 'DOB', value })}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={PickerLabelStyle}>Gender</Text>
          <Picker
            selectedValue={this.props.gender}
            onValueChange={value => this.props.clientUpdate({ prop: 'gender', value })}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
         { _.map(this.props.guardians_list, (guardian, index) => {
            return (
                <Input
                  label="Guardian"
                  placeholder="full name"
                  value={this.props.guardians_list[index][0]}
                  onChangeText={value => this.handleGuardians(value, index)}
                 />
                )
            })
          }
          <Button onPress={this.addGuardian.bind(this)}>Add</Button>
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="777-777-7777"
            value={this.props.phone}
            onChangeText={value => this.props.clientUpdate({ prop: 'phone', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Email"
            placeholder="email address"
            value={this.props.email}
            onChangeText={value => this.props.clientUpdate({ prop: 'email', value })}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={PickerLabelStyle}>Session</Text>
          <Picker
            selectedValue={this.props.shift}
            onValueChange={value => this.props.clientUpdate({ prop: 'shift', value })}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
          </Picker>
        </CardSection>
      </View>
    );
  }

}

const mapStateToProps = (state) => {
  // Supplying properties as value references gets messy easily, so guardians_list allows a reference to an array instead.
  const { name, DOB, gender, guardians, phone, email, shift } = state.clientForm;
  const guardians_list = _.map(guardians, (guardian, index) => { return [guardian.name, index] });

  return { name, DOB, gender, guardians, guardians_list, phone, email, shift };
};

export default connect(mapStateToProps, { clientUpdate })(ClientForm);
