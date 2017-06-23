import _ from 'lodash';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import ClientForm from './ClientForm';
import { clientUpdate, clientSave, clientDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class ClientEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    this.fillFormWithClientInfo();
  }

  onFormsPress(){
    Actions.formList( { client: {...this.props.client, forms: {"A": {"name": "test1"},"B":{"name": "test2"}}} });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.clientSave({ name, phone, shift, uid: this.props.client.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming session is on ${shift}`);
  }

  onDeletePress() {
    this.setState({ showModal: !this.state.showModal });
  }

  onAcceptDelete() {
    const { uid } = this.props.client;

    this.props.clientDelete({ uid });
  }

  onDeclineDelete() {
    this.setState({ showModal: false });
  }

  fillFormWithClientInfo() {
    _.each(this.props.client, (value, prop) => {
      this.props.clientUpdate({ prop, value });
    });
  }

  render() {
    return (
      <Card>
        <ClientForm />
        <CardSection>
          <Button onPress={this.onFormsPress.bind(this)}>
            Forms
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onDeletePress.bind(this)}>
            Delete Client
          </Button>
        </CardSection>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAcceptDelete.bind(this)}
          onDecline={this.onDeclineDelete.bind(this)}
        >
          Are you sure you want to delete this client?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.clientForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { clientUpdate, clientSave, clientDelete })(ClientEdit);
