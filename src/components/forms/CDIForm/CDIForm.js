import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-icon-checkbox';
import { fieldUpdate } from '../../../actions';
import { CardSection, Multiline, Button } from '../../common';
import IncDecInput from '../../IncDecInput';

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
    Actions.cdiFollowup();
  }

  render(){
    return (
      <ScrollView>
        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.headerStyle}>Positive</Text>

          <IncDecInput
            label="Neutral Talk" 
          />
          <IncDecInput
            label="Behavior Description" 
          />
          <IncDecInput
            label="Reflection" 
          />
          <IncDecInput
            label="Labeled Praise" 
          />
          <IncDecInput
            label="Unlabeled Praise" 
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.headerStyle}>Avoid</Text>

          <IncDecInput
            label="Question" 
          />
          <IncDecInput
            label="Commands"
          />
          <IncDecInput
            label="Negative Talk" 
          />
        </CardSection> 
        <CardSection>
          <Button onPress={this.onSave.bind(this)}>
            Save Coding
          </Button>
        </CardSection>
      </ScrollView>
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
  return {};
}

export default connect(mapStateToProps, { fieldUpdate })(PrePostForm);