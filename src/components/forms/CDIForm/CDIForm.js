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
    Actions.cdiFollowup();
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
              label="Commands"
              onChangeText={value => this.props.fieldUpdate({ field: 'commands', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'commands', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'commands', 'Dec')}
              value={`${this.props.fields.commands}`}
            />
            <IncDecInput
              label="Negative Talk"
              onChangeText={value => this.props.fieldUpdate({ field: 'negativeTalk', value: value.match(/[0-9]*/g).join('')})}
              onInc={this.handleIncDec.bind(this, 'negativeTalk', 'Inc')}
              onDec={this.handleIncDec.bind(this, 'negativeTalk', 'Dec')}
              value={`${this.props.fields.negativeTalk}`}
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
  const { fields } = state.form;

  return { fields };
}

export default connect(mapStateToProps, { fieldUpdate })(PrePostForm);