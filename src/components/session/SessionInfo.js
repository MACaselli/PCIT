import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { formUpdate, formCreate, formReset } from '../../actions';
import { Card, CardSection, Button, Input } from '../common';
import IncDecInput from '../IncDecInput';

class SessionInfo extends Component {
  onCodingPress(){
    Actions.codingChoice();
  }
  // componentWillMount(){
  //   this.props.formReset();

  //   date = new Date();
  //   this.props.formUpdate({ prop: 'date', value: [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/') })
  // }

  // onButtonPress() {
  //   const { name, date, uid } = this.props;

  //   this.props.formCreate({ name, date, uid });
  // }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Date"
            placeholder="mm/dd/yyyy"
            value={this.props.date}
            onChangeText={value => this.props.formUpdate({ prop: 'date', value })}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text>Days of Homework Completed</Text>
          <IncDecInput label="Guardian 1" />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}> 
          <Text>ECBI Score</Text>
          <Text>Guardian 1</Text>
          <IncDecInput label="Intensity" />
          <IncDecInput label="Problem" />
        </CardSection>

        <CardSection>
          <Text>Completed Forms:</Text>
        </CardSection>

        <CardSection>
          <Button onPress={this.onCodingPress}>
            Add Coding
          </Button>
        </CardSection>

        <CardSection>
          <Button>
            Session Complete
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { type } = state.form;

  return { type };
};

export default connect(mapStateToProps, { formUpdate, formCreate, formReset })(SessionInfo);
