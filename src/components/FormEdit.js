import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Picker } from 'react-native';
import { formUpdate, formSave, formDelete } from '../actions';
import { Card, CardSection, Button, Confirm, Input } from './common';

class FormEdit extends Component {
  componentWillMount() {
    this.fillFormWithData();
  }

  fillFormWithData() {
    _.each(this.props.form, (value, prop) => {
      this.props.formUpdate({ prop, value });
    });
  }

  onFormSave(){
  	const { name, type, id, uid } = this.props
  	this.props.formSave({ name, type, id, uid });
  }

  onFormDelete(){
  	const { id, uid } = this.props
  	this.props.formDelete({ id, uid });
  }

  render() {
    return(
      <Card>
      	<CardSection>
      	  <Input
      	  	label="Name"
      	  	value={this.props.name}
      	  	onChangeText={value => this.props.formUpdate({ prop: 'name', value })}
      	  />
      	</CardSection>

      	<CardSection style={{ flexDirection: 'column' }}>
      	  <Text style={styles.pickerLabelStyle}>Type</Text>
      	  <Picker
      	  	selectedValue={this.props.type}
      	  	onValueChange={value => this.props.formUpdate({ prop: 'type', value })}
      	  >
      	  	<Picker.Item label="PDI" value="PDI" />
      	  	<Picker.Item label="CDI" value="CDI" />
      	  </Picker>
      	</CardSection>

      	<CardSection>
      	  <Button onPress={this.onFormSave.bind(this)}>
      		Save
      	  </Button>
      	</CardSection>

      	<CardSection>
      	  <Button onPress={this.onFormDelete.bind(this)}>
      	    Delete
      	  </Button>
      	</CardSection>
      </Card>
    );
  }
};

const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 10
  }
};

const mapStateToProps = (state) => {
  const { uid } = state.clientForm;
  const { name, id, type } = state.form;

  return { name, type, id, uid };
};

export default connect(mapStateToProps, { formUpdate, formSave, formDelete })(FormEdit);