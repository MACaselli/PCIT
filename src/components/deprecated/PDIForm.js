import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import CheckBox from 'react-native-icon-checkbox';
import { fieldUpdate } from 'actions';
import { CardSection, Multiline } from 'common';
import IncDecInput from 'components/IncDecInput';

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

  handleIncDec(field, type){
    const current = Number(this['props']['PDI'][field]);
    var value = 0;

    if (type === "Inc"){
      value = current + 1;
    }
    else if (type === "Dec" && current > 0){
      value = current - 1;
    }
    else{
      value = current;
    }

    this.props.fieldUpdate({ field, value: String(value), formType: 'PDI' })
  }

  render(){
    return (
      <View>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.headerStyle}>Guardian</Text>
          <CheckBox
            label="Mother"
            size={30}
            checked={this.props.PDI.mother}
            onPress={this.handleCheck.bind(this, 'mother')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Father"
            size={30}
            checked={this.props.PDI.father}
            onPress={this.handleCheck.bind(this, 'father')}
            iconStyle={styles.checkStyle}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.headerStyle}>Command</Text>
          <CheckBox
            label="DC"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.DC}
            onPress={this.handleRadio.bind(this, 'DC', 'command')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="IC"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.IC}
            onPress={this.handleRadio.bind(this, 'IC', 'command')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="No Opportunity"
            size={30}
            checked={this.props.PDI.NoOp}
            onPress={this.handleCheck.bind(this, 'NoOp')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Obey"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.Obey1}
            onPress={this.handleRadio.bind(this, 'Obey1', 'ob1')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Disobey"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.Disobey1}
            onPress={this.handleRadio.bind(this, 'Disobey1', 'ob1')}
            iconStyle={styles.checkStyle}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.headerStyle}>Praise</Text>
          <CheckBox
            label="LP"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.LP1}
            onPress={this.handleRadio.bind(this, 'LP1', 'p1')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="UP"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.UP1}
            onPress={this.handleRadio.bind(this, 'UP1', 'p1')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Chair Warning"
            size={30}
            checked={this.props.PDI.ChWarn}
            onPress={this.handleCheck.bind(this, 'ChWarn')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Obey"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.Obey2}
            onPress={this.handleRadio.bind(this, 'Obey2', 'ob2')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Disobey"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.Disobey2}
            onPress={this.handleRadio.bind(this, 'Disobey2', 'ob2')}
            iconStyle={styles.checkStyle}
          />
        </CardSection> 

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.headerStyle}>Praise</Text>
          <CheckBox
            label="LP"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.LP2}
            onPress={this.handleRadio.bind(this, 'LP2', 'p2')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="UP"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.UP2}
            onPress={this.handleRadio.bind(this, 'UP2', 'p2')}
            iconStyle={styles.checkStyle}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <IncDecInput
            label="To Chair"
            value={this.props.PDI.ToCh}
            onChangeText={value => this.props.fieldUpdate({ field: 'ToCh', value: value.match(/[0-9]*/g).join(''), formType: 'PDI' })}
            onInc={this.handleIncDec.bind(this, 'ToCh', "Inc")}
            onDec={this.handleIncDec.bind(this, 'ToCh', "Dec")} 
          />
          <CheckBox
            label="Stays On"
            size={30}
            checked={this.props.PDI.StayOn}
            onPress={this.handleCheck.bind(this, 'StayOn')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Gets Off"
            size={30}
            checked={this.props.PDI.GetsOff}
            onPress={this.handleCheck.bind(this, 'GetsOff')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Obey"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.Obey3}
            onPress={this.handleRadio.bind(this, 'Obey3', 'ob3')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Disobey"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.PDI.Disobey3}
            onPress={this.handleRadio.bind(this, 'Disobey3', 'ob3')}
            iconStyle={styles.checkStyle}
          />
        </CardSection>

        <CardSection>
          <Multiline
            label="Notes"
            value={this.props.PDI.notes}
            onChangeText={(value) => this.props.fieldUpdate({ field: 'notes', value, formType: 'PDI' })}
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
  }
};

const mapStateToProps = (state) => {
  const { PDI } = state.form.forms;

  return { PDI };
}

export default connect(mapStateToProps, { fieldUpdate })(PDIForm);