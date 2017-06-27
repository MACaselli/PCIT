import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate, formCreate } from '../actions';
import { Card, CardSection, Button, Input } from './common';

class FormCreate extends Component {
  onButtonPress() {
    const { name, uid } = this.props;

    this.props.formCreate({ name, uid });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="form name"
            value={this.props.name}
            onChangeText={value => this.props.formUpdate({ prop: 'name', value })}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { uid } = state.clientForm;
  const { name } = state.form;

  return { name, uid };
};

export default connect(mapStateToProps, { formUpdate, formCreate })(FormCreate);
