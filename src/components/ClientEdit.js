import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import ClientForm from './ClientForm';
import { clientUpdate, clientSave, clientDelete, clientReset } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class ClientEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    this.fillFormWithClientInfo();
  }

  onSessionsPress(){
    Actions.sessionList( { uid: this.props.client.uid });
  }

  onButtonPress() {
    const { name, DOB, gender, phone, email, shift } = this.props;

    this.props.clientSave({ name, DOB, gender, phone, email, shift, uid: this.props.client.uid });
    this.props.clientReset();
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
    this.props.clientReset();
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
        <ScrollView>
          <ClientForm />
          <CardSection>
            <Button onPress={this.onSessionsPress.bind(this)}>
              Session Overview
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
        </ScrollView>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, DOB, gender, phone, email, shift } = state.clientForm;

  return { name, DOB, gender, phone, email, shift };
};

export default connect(mapStateToProps, { clientUpdate, clientSave, clientDelete, clientReset })(ClientEdit);
