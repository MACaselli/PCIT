import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { clientUpdate, clientCreate, clientReset } from '../actions';
import { Card, CardSection, Button } from './common';
import ClientForm from './ClientForm';

class ClientCreate extends Component {
  componentWillMount(){
    this.props.clientReset();
  }

  onButtonPress() {
    const { name, DOB, gender, phone, email, shift } = this.props;

    this.props.clientCreate({ name, DOB, gender, phone, email, shift: shift || 'Monday' });
    this.props.clientReset();
  }

  render() {
    return (
      <Card>
        <ScrollView>
          <ClientForm {...this.props} />
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Create
            </Button>
          </CardSection>
        </ScrollView>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, DOB, gender, phone, email, shift } = state.clientForm;

  return { name, DOB, gender, phone, email, shift };
};

export default connect(mapStateToProps, { clientUpdate, clientCreate, clientReset })(ClientCreate);
