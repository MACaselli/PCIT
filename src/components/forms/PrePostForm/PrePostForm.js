import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import { fieldUpdate } from 'actions';
import { CardSection, Button } from 'common';
import { Multiline, IncDecInput, Timer } from 'custom';

class PrePostForm extends Component{
  handleIncDec(field, type){
    const current = Number(this.props.fields[field]);
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

    this.props.fieldUpdate({ field, value })
  }

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
              onInc={this.handleIncDec.bind(this, 'neutralTalk', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'neutralTalk', 'Dec')}
              value={`${this.props.fields.neutralTalk}`}
            />
            <IncDecInput
              label="Behavior Description"
              onChangeText={value => this.props.fieldUpdate({ field: 'behaviorDescription', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'behaviorDescription', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'behaviorDescription', 'Dec')}
              value={`${this.props.fields.behaviorDescription}`}
            />
            <IncDecInput
              label="Reflection"
              onChangeText={value => this.props.fieldUpdate({ field: 'reflection', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'reflection', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'reflection', 'Dec')}
              value={`${this.props.fields.reflection}`}
            />
            <IncDecInput
              label="Labeled Praise"
              onChangeText={value => this.props.fieldUpdate({ field: 'labeledPraise', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'labeledPraise', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'labeledPraise', 'Dec')}
              value={`${this.props.fields.labeledPraise}`}
            />
            <IncDecInput
              label="Unlabeled Praise"
              onChangeText={value => this.props.fieldUpdate({ field: 'unlabeledPraise', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'unlabeledPraise', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'unlabeledPraise', 'Dec')}
              value={`${this.props.fields.unlabeledPraise}`}
            />
          </CardSection>

          <CardSection style={{ flexDirection: 'column' }}>
            <Text style={styles.headerStyle}>Avoid</Text>

            <IncDecInput
              label="Question"
              onChangeText={value => this.props.fieldUpdate({ field: 'question', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'question', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'question', 'Dec')}
              value={`${this.props.fields.question}`}
            />
            <IncDecInput
              label="Negative Talk"
              onChangeText={value => this.props.fieldUpdate({ field: 'negativeTalk', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'negativeTalk', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'negativeTalk', 'Dec')}
              value={`${this.props.fields.negativeTalk}`}
            />
          </CardSection> 

          <CardSection style={{ flexDirection: 'column' }}>
            <IncDecInput
              label="DC Comply"
              onChangeText={value => this.props.fieldUpdate({ field: 'dcComply', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'dcComply', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'dcComply', 'Dec')}
              value={`${this.props.fields.dcComply}`}
            />
            <IncDecInput
              label="DC Noncomply" 
              onChangeText={value => this.props.fieldUpdate({ field: 'dcNoncomply', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'dcNoncomply', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'dcNoncomply', 'Dec')}
              value={`${this.props.fields.dcNoncomply}`}
            />
            <IncDecInput
              label="DC No Opportunity"
              onChangeText={value => this.props.fieldUpdate({ field: 'dcNoOpportunity', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'dcNoOpportunity', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'dcNoOpportunity', 'Dec')}
              value={`${this.props.fields.dcNoOpportunity}`}
            />
            <IncDecInput
              label="IDC Comply"
              onChangeText={value => this.props.fieldUpdate({ field: 'idcComply', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'idcComply', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'idcComply', 'Dec')}
              value={`${this.props.fields.idcComply}`}
            />
            <IncDecInput
              label="IDC Noncomply"
              onChangeText={value => this.props.fieldUpdate({ field: 'idcNoncomply', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'idcNoncomply', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'idcNoncomply', 'Dec')}
              value={`${this.props.fields.idcNoncomply}`}
            />
            <IncDecInput
              label="IDC No Opportunity"
              onChangeText={value => this.props.fieldUpdate({ field: 'idcNoOpportunity', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'idcNoOpportunity', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'idcNoOpportunity', 'Dec')}
              value={`${this.props.fields.idcNoOpportunity}`}    
            />
          </CardSection>
        </ScrollView>
        <View>
          <CardSection>
            <Button onPress={this.onSave.bind(this)}>
              Save Coding
            </Button>
          </CardSection>
        </View>
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
  const { fields } = state.form;

  return { fields };
}

export default connect(mapStateToProps, { fieldUpdate })(PrePostForm);