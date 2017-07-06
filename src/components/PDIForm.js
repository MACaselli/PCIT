import React, { Component } from 'react';
import { View, Text, Picker, Switch } from 'react-native';
import { connect } from 'react-redux';
import CheckBox from 'react-native-icon-checkbox';
import { fieldUpdate } from '../actions';
import { CardSection, Input } from './common';

class PDIForm extends Component{
  handleCheck(field, value) {
    this.props.fieldUpdate({ field, value, formType: 'PDI' });
  }

  handleRadio(field, group, value) {
    this.props.fieldUpdate({ field, value, formType: 'PDI' });

    // Only perform action if value is true (only reset other buttons when setting).
    // When a radio button is checked, all other buttons in that group are false.

    if (value){
      radioGroups[group].forEach((item) => {
        if (item !== field){
          this.props.fieldUpdate({ field: item, value: false, formType: 'PDI' });
        }
      }, this);
    }
  }

  render(){
    return (
      <View>
        <CardSection>
          <Input
            label="Date"
            placeholder="mm/dd/yyyy"
            value={this.props.PDI.date}
            onChangeText={value => this.props.fieldUpdate({ field: 'date', value, formType: 'PDI' })}
          />
        </CardSection> 

        <CardSection style={{ flexDirection: 'column' }}>
          <CheckBox
            label="Mother"
            size={30}
            checked={this.props.PDI.mother}
            onPress={this.handleCheck.bind(this, 'mother')}
          />
          <CheckBox
            label="Father"
            size={30}
            checked={this.props.PDI.father}
            onPress={this.handleCheck.bind(this, 'father')}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text>Command</Text>
          <CheckBox
            label="DC"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.DC}
            onPress={this.handleRadio.bind(this, 'DC', 'command')}
          />
          <CheckBox
            label="IC"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.IC}
            onPress={this.handleRadio.bind(this, 'IC', 'command')}
          />
          <CheckBox
            label="No Opportunity"
            size={30}
            checked={this.props.PDI.NoOp}
            onPress={this.handleCheck.bind(this, 'NoOp')}
          />
          <CheckBox
            label="Obey"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.Obey1}
            onPress={this.handleRadio.bind(this, 'Obey1', 'ob1')}
          />
          <CheckBox
            label="Disobey"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.Disobey1}
            onPress={this.handleRadio.bind(this, 'Disobey1', 'ob1')}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text>Praise</Text>
          <CheckBox
            label="LP"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.LP1}
            onPress={this.handleRadio.bind(this, 'LP1', 'p1')}
          />
          <CheckBox
            label="UP"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.UP1}
            onPress={this.handleRadio.bind(this, 'UP1', 'p1')}
          />
          <CheckBox
            label="Chair Warning"
            size={30}
            checked={this.props.PDI.ChWarn}
            onPress={this.handleCheck.bind(this, 'ChWarn')}
          />
          <CheckBox
            label="Obey"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.Obey2}
            onPress={this.handleRadio.bind(this, 'Obey2', 'ob2')}
          />
          <CheckBox
            label="Disobey"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.Disobey2}
            onPress={this.handleRadio.bind(this, 'Disobey2', 'ob2')}
          />
        </CardSection> 

        <CardSection style={{ flexDirection: 'column' }}>
          <Text>Praise</Text>
          <CheckBox
            label="LP"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.LP2}
            onPress={this.handleRadio.bind(this, 'LP2', 'p2')}
          />
          <CheckBox
            label="UP"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.UP2}
            onPress={this.handleRadio.bind(this, 'UP2', 'p2')}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Input
            label="To Chair"
            placeholder="0"
            value={this.props.PDI.ToCh}
            onChangeText={value => this.props.fieldUpdate({ field: 'ToCh', value, formType: 'PDI' })}
          />
          <CheckBox
            label="Stays On"
            size={30}
            checked={this.props.PDI.StayOn}
            onPress={this.handleCheck.bind(this, 'StayOn')}
          />
          <CheckBox
            label="Gets Off"
            size={30}
            checked={this.props.PDI.GetsOff}
            onPress={this.handleCheck.bind(this, 'GetsOff')}
          />
          <CheckBox
            label="Obey"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.Obey3}
            onPress={this.handleRadio.bind(this, 'Obey3', 'ob3')}
          />
          <CheckBox
            label="Disobey"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.Disobey3}
            onPress={this.handleRadio.bind(this, 'Disobey3', 'ob3')}
          />
        </CardSection>
      </View>
    )
  }
}

const radioGroups = {
  command: ['DC', 'IC'],
  ob1: ['Obey1', 'Disobey1'],
  p1: ['LP1', 'UP1'],
  ob2: ['Obey2', 'Disobey2'],
  p2: ['LP2', 'UP2'],
  ob3: ['Obey3', 'Disobey3']
}

const styles = {
  switchLabelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 10
  }
};

const mapStateToProps = (state) => {
  const { PDI } = state.form.forms;

  return { PDI };
}

export default connect(mapStateToProps, { fieldUpdate })(PDIForm);