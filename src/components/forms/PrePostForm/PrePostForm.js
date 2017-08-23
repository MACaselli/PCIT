import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import { fieldUpdate } from '../../../actions';
import { CardSection, Multiline, Button } from '../../common';
import IncDecInput from '../../IncDecInput';
import Timer from '../../Timer';

class PrePostForm extends Component{
  // handleIncDec(field, type){
  //   const current = Number(this['props']['CDI'][field]);
  //   var value = 0;

  //   if (type === "Inc"){
  //     value = current + 1;
  //   }
  //   else if (type === "Dec" && current > 0){
  //     value = current - 1;
  //   }
  //   else{
  //     value = current;
  //   }

  //   this.props.fieldUpdate({ field, value: String(value), formType: 'CDI' })
  // }

  onSave(){
    Actions.prePostFollowup();
  }

  render(){
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Timer />
        </View>
        <ScrollView>
          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={styles.headerStyle}>Positive</Text>

            <IncDecInput
              label="Neutral Talk" 
              onChangeText={value => this.props.fieldUpdate({ field: 'neutralTalk', value: value.match(/[0-9]*/g).join('')})}
            />
            <IncDecInput
              label="Behavior Description"
              onChangeText={value => this.props.fieldUpdate({ field: 'behaviorDescription', value: value.match(/[0-9]*/g).join('')})}
            />
            <IncDecInput
              label="Reflection"
              onChangeText={value => this.props.fieldUpdate({ field: 'reflection', value: value.match(/[0-9]*/g).join('')})} 
            />
            <IncDecInput
              label="Labeled Praise"
              onChangeText={value => this.props.fieldUpdate({ field: 'labeledPraise', value: value.match(/[0-9]*/g).join('')})}
            />
            <IncDecInput
              label="Unlabeled Praise"
              onChangeText={value => this.props.fieldUpdate({ field: 'unlabeledPraise', value: value.match(/[0-9]*/g).join('')})}
            />
          </CardSection>

          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={styles.headerStyle}>Avoid</Text>

            <IncDecInput
              label="Question"
              onChangeText={value => this.props.fieldUpdate({ field: 'question', value: value.match(/[0-9]*/g).join('')})}
            />
            <IncDecInput
              label="Negative Talk"
              onChangeText={value => this.props.fieldUpdate({ field: 'negativeTalk', value: value.match(/[0-9]*/g).join('')})}
            />
          </CardSection> 

          <CardSection style={{ flexDirection: 'column' }}>
            <IncDecInput
              label="DC Comply"
              onChangeText={value => this.props.fieldUpdate({ field: 'dcComply', value: value.match(/[0-9]*/g).join('')})}
            />
            <IncDecInput
              label="DC Noncomply" 
              onChangeText={value => this.props.fieldUpdate({ field: 'dcNoncomply', value: value.match(/[0-9]*/g).join('')})}
            />
            <IncDecInput
              label="DC No Opportunity"
              onChangeText={value => this.props.fieldUpdate({ field: 'dcNoOpportunity', value: value.match(/[0-9]*/g).join('')})}
            />
            <IncDecInput
              label="IDC Comply"
              onChangeText={value => this.props.fieldUpdate({ field: 'idcComply', value: value.match(/[0-9]*/g).join('')})}
            />
            <IncDecInput
              label="IDC Noncomply"
              onChangeText={value => this.props.fieldUpdate({ field: 'idcNoncomply', value: value.match(/[0-9]*/g).join('')})}
            />
            <IncDecInput
              label="IDC No Opportunity"
              onChangeText={value => this.props.fieldUpdate({ field: 'idcNoOpportunity', value: value.match(/[0-9]*/g).join('')})}
            />
          </CardSection>

          <CardSection>
            <Button onPress={this.onSave.bind(this)}>
              Save Coding
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
  const { fields, time } = state.form;

  return { fields, time};
}

export default connect(mapStateToProps, { fieldUpdate })(PrePostForm);