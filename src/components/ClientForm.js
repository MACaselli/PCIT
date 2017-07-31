import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { clientUpdate } from '../actions/ClientActions';
import { CardSection, Input } from './common';


class ClientForm extends Component {
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
          <Text style={styles.pickerLabelStyle}>Gender</Text>
          <Picker
            selectedValue={this.props.gender}
            onValueChange={value => this.props.clientUpdate({ prop: 'gender', value })}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
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
          <Text style={styles.pickerLabelStyle}>Session</Text>
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

const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 10
  }
};

const mapStateToProps = (state) => {
  const { name, DOB, gender, phone, email, shift } = state.clientForm;

  return { name, DOB, gender, phone, email, shift };
};

export default connect(mapStateToProps, { clientUpdate })(ClientForm);
