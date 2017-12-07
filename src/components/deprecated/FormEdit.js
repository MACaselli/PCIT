import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, Text, Picker } from "react-native";
import { formUpdate, formSave, formDelete } from "actions";
import { Card, CardSection, Button, Input } from "common";
import PDIForm from "components/forms/PDIForm";
import CDIForm from "components/forms/CDIForm";

function TypeForm({ type }){
	switch(type){
	case "PDI":
		return <PDIForm />;
	default:
		return <CDIForm />;
	}
}

class FormEdit extends Component {
	componentWillMount() {
		this.fillFormWithData();
	}

	fillFormWithData() {
		_.each(this.props.form, (value, prop) => {
			this.props.formUpdate({ prop, value, type: this.props.form.type });
		});
	}

	onFormSave(){
		const { name, date, type, id, uid } = this.props;
		var form;

		if (type == "PDI"){
			form = this.props.forms.PDI;
		}
		else if (type == "CDI"){
			form = this.props.forms.CDI;
		}

		this.props.formSave({ name, date, type, form, id, uid });
	}

	onFormDelete(){
		const { id, uid } = this.props;
		this.props.formDelete({ id, uid });
	}

	render() {
		return(
			<Card>
				<ScrollView>
					<CardSection>
						<Input
							label="Name"
							value={this.props.name}
							onChangeText={value => this.props.formUpdate({ prop: "name", value })}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Date"
							placeholder="mm/dd/yyyy"
							value={this.props.date}
							onChangeText={value => this.props.formUpdate({ prop: "date", value })}
						/>
					</CardSection> 

					<CardSection style={{ flexDirection: "column" }}>
						<Text style={styles.pickerLabelStyle}>Type</Text>
						<Picker
							selectedValue={this.props.type}
							onValueChange={value => this.props.formUpdate({ prop: "type", value })}
						>
							<Picker.Item label="PDI" value="PDI" />
							<Picker.Item label="CDI" value="CDI" />
						</Picker>
					</CardSection>

					<TypeForm type={this.props.type} />

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
				</ScrollView>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { uid } = state.clientForm;
	const { name, date, type, forms, id } = state.form;

	return { name, date, type, forms, id, uid };
};

export default connect(mapStateToProps, { formUpdate, formSave, formDelete })(FormEdit);