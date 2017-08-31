import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate, formCreate, formReset } from 'actions';
import { Card, CardSection, Button, Input } from 'common';

class FormCreate extends Component {
  componentWillMount(){
    this.props.formReset();

    date = new Date();
    this.props.formUpdate({ prop: 'date', value: [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/') })
  }

  onButtonPress() {
    const { name, date, uid } = this.props;

    this.props.formCreate({ name, date, uid });
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
          <Input
            label="Date"
            placeholder="mm/dd/yyyy"
            value={this.props.date}
            onChangeText={value => this.props.formUpdate({ prop: 'date', value })}
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
  const { name, date } = state.form;

  return { name, date, uid };
};

export default connect(mapStateToProps, { formUpdate, formCreate, formReset })(FormCreate);
