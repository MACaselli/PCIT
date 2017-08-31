import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import CheckBox from 'react-native-icon-checkbox';
import { fieldUpdate } from 'actions';
import { CardSection, Multiline } from 'common';
import IncDecInput from 'components/IncDecInput';

class CDIForm extends Component{
  handleCheck(field, value) {
    this.props.fieldUpdate({ field, value, formType: 'CDI' });
  }

  handleRadio(field, group, value) {
    this.props.fieldUpdate({ field, value, formType: 'CDI' });

    // Only perform action if value is true (only reset other buttons when setting).
    // When a radio button is checked, all other buttons in that group are false.

    if (value){
      radioGroups[group].forEach((item) => {
        if (item !== field){
          this.props.fieldUpdate({ field: item, value: false, formType: 'CDI' });
        }
      }, this);
    }
  }

  handleIncDec(field, type){
    const current = Number(this['props']['CDI'][field]);
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

    this.props.fieldUpdate({ field, value: String(value), formType: 'CDI' })
  }

  render(){
    return (
      <View>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.headerStyle}>Guardian</Text>

          <CheckBox
            label="Mother"
            size={30}
            checked={this.props.CDI.mother}
            onPress={this.handleCheck.bind(this, 'mother')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Father"
            size={30}
            checked={this.props.CDI.father}
            onPress={this.handleCheck.bind(this, 'father')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Other"
            size={30}
            checked={this.props.CDI.other}
            onPress={this.handleCheck.bind(this, 'other')}
            iconStyle={styles.checkStyle}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.headerStyle}>Do Skills</Text>

          <IncDecInput
            label="Neutral Talk"
            value={this.props.CDI.neutraltalk}
            onChangeText={value => this.props.fieldUpdate({ field: 'neutraltalk', value: value.match(/[0-9]*/g).join(''), formType: 'CDI' })}
            onInc={this.handleIncDec.bind(this, 'neutraltalk', "Inc")}
            onDec={this.handleIncDec.bind(this, 'neutraltalk', "Dec")} 
          />
          <IncDecInput
            label="Behavior Description"
            value={this.props.CDI.behaviordescription}
            onChangeText={value => this.props.fieldUpdate({ field: 'behaviordescription', value: value.match(/[0-9]*/g).join(''), formType: 'CDI' })}
            onInc={this.handleIncDec.bind(this, 'behaviordescription', "Inc")}
            onDec={this.handleIncDec.bind(this, 'behaviordescription', "Dec")} 
          />
          <IncDecInput
            label="Reflection"
            value={this.props.CDI.reflection}
            onChangeText={value => this.props.fieldUpdate({ field: 'reflection', value: value.match(/[0-9]*/g).join(''), formType: 'CDI' })}
            onInc={this.handleIncDec.bind(this, 'reflection', "Inc")}
            onDec={this.handleIncDec.bind(this, 'reflection', "Dec")} 
          />
          <IncDecInput
            label="Labeled Praise"
            value={this.props.CDI.labeledpraise}
            onChangeText={value => this.props.fieldUpdate({ field: 'labeledpraise', value: value.match(/[0-9]*/g).join(''), formType: 'CDI' })}
            onInc={this.handleIncDec.bind(this, 'labeledpraise', "Inc")}
            onDec={this.handleIncDec.bind(this, 'labeledpraise', "Dec")} 
          />
          <IncDecInput
            label="Unlabeled Praise"
            value={this.props.CDI.unlabeledpraise}
            onChangeText={value => this.props.fieldUpdate({ field: 'unlabeledpraise', value: value.match(/[0-9]*/g).join(''), formType: 'CDI' })}
            onInc={this.handleIncDec.bind(this, 'unlabeledpraise', "Inc")}
            onDec={this.handleIncDec.bind(this, 'unlabeledpraise', "Dec")} 
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.headerStyle}>Avoid</Text>

          <IncDecInput
            label="Questions"
            value={this.props.CDI.questions}
            onChangeText={value => this.props.fieldUpdate({ field: 'questions', value: value.match(/[0-9]*/g).join(''), formType: 'CDI' })}
            onInc={this.handleIncDec.bind(this, 'questions', "Inc")}
            onDec={this.handleIncDec.bind(this, 'questions', "Dec")} 
          />
          <IncDecInput
            label="Commands"
            value={this.props.CDI.commands}
            onChangeText={value => this.props.fieldUpdate({ field: 'commands', value: value.match(/[0-9]*/g).join(''), formType: 'CDI' })}
            onInc={this.handleIncDec.bind(this, 'commands', "Inc")}
            onDec={this.handleIncDec.bind(this, 'commands', "Dec")} 
          />
          <IncDecInput
            label="Negative Talk"
            value={this.props.CDI.negativetalk}
            onChangeText={value => this.props.fieldUpdate({ field: 'negativetalk', value: value.match(/[0-9]*/g).join(''), formType: 'CDI' })}
            onInc={this.handleIncDec.bind(this, 'negativetalk', "Inc")}
            onDec={this.handleIncDec.bind(this, 'negativetalk', "Dec")} 
          />
        </CardSection> 

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.headerStyle}>Positive</Text>

          <Text style={styles.subHeaderStyle}>Imitate</Text>
          <CheckBox
            label="Satisfactory"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.CDI.satisfactory1}
            onPress={this.handleRadio.bind(this, 'satisfactory1', 'eval1')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Needs Practice"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.CDI.needspractice1}
            onPress={this.handleRadio.bind(this, 'needspractice1', 'eval1')}
            iconStyle={styles.checkStyle}
          />

          <Text style={styles.subHeaderStyle}>Use Enthusiasm</Text>
          <CheckBox
            label="Satisfactory"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.CDI.satisfactory2}
            onPress={this.handleRadio.bind(this, 'satisfactory2', 'eval2')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Needs Practice"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.CDI.needspractice2}
            onPress={this.handleRadio.bind(this, 'needspractice2', 'eval2')}
            iconStyle={styles.checkStyle}
          />

          <Text style={styles.subHeaderStyle}>Ignore Distruptive Behavior</Text>
          <CheckBox
            label="Satisfactory"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.CDI.satisfactory3}
            onPress={this.handleRadio.bind(this, 'satisfactory3', 'eval3')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Needs Practice"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.CDI.needspractice3}
            onPress={this.handleRadio.bind(this, 'needspractice3', 'eval3')}
            iconStyle={styles.checkStyle}
          />
          <CheckBox
            label="Not Applicable"
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
            checked={this.props.CDI.notapplicable}
            onPress={this.handleRadio.bind(this, 'notapplicable', 'eval3')}
            iconStyle={styles.checkStyle}
          />
        </CardSection>

        <CardSection>
          <Multiline
            label="Notes"
            value={this.props.CDI.notes}
            onChangeText={value => this.props.fieldUpdate({ field: 'notes', value, formType: 'CDI' })}
          />
        </CardSection>
      </View>
    )
  }
}

const radioGroups = {
  eval1: ['satisfactory1', 'needspractice1'],
  eval2: ['satisfactory2', 'needspractice2'],
  eval3: ['satisfactory3', 'needspractice3', 'notapplicable']
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
  const { CDI } = state.form.forms;

  return { CDI };
}

export default connect(mapStateToProps, { fieldUpdate })(CDIForm);