import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import _ from "lodash";
import DatePicker from "react-native-datepicker";
import { sessionCreate, sessionUpdate, sessionDelete, sessionReset } from "actions";
import { CardSection } from "common";
import { IncDecInput, SliderInput } from "custom";
import { HeaderStyle, SubHeaderStyle } from "styles";

function DateSelect(props){
	const { date, onDateChange } = props;
	return (<CardSection style={{ flexDirection: "row", alignItems: "center" }}>
		<Text style={{ fontSize: 18, paddingLeft: 20, flex: 1 }}>Date</Text>
		<DatePicker
			style={{ flex: 3 }}
			date={date}
			mode="date"
			placeholder="select date"
			format="MM-DD-YYYY"
			minDate="01-01-1900"
			maxDate="01-01-2100"
			confirmBtnText="Confirm"
			cancelBtnText="Cancel"
			customStyles={{
				dateIcon: {
					position: "absolute",
					left: 0,
					top: 4,
					marginLeft: 0
				},
				dateInput: {
					marginLeft: 36
				},
				dateText: {
					fontSize: 18
				}
			}}
			onDateChange={onDateChange}
		/>
	</CardSection>);
}

class SessionForm extends Component {
	handleDOH(index, value){
		var { daysofhomework } = this.props;
		daysofhomework[index].Days = parseInt(value);
		this.props.sessionUpdate({ prop: "daysofhomework", value: daysofhomework });
	}

	handleECBI(index, type, value){
		var { ecbiscores } = this.props;
		if (!ecbiscores[index]){
			ecbiscores[index] = {}; // Create object if non-existant.
		}
		ecbiscores[index][type] = parseInt(value);
		this.props.sessionUpdate({ prop: "ecbiscores", value: ecbiscores });
	}

	handleIncDec(index, type, operation){
		switch(type){
			case "DOH":
				var current = this.props.daysofhomework[index].Days;
				break;
			default:
				var current = this.props.ecbiscores[index][type];
		}

		var value = 0;

		if (operation === "Inc"){
			value = current + 1;
		}
		else if (operation === "Dec" && current > 0){
			value = current - 1;
		}
		else{
			value = current;
		}

		switch(type){
			case "DOH":
				this.handleDOH(index, value);
				break;
			default:
				this.handleECBI(index, type, value);
				break;
		}
	}

	render() {
		const { date, forms_list, guardians, daysofhomework_list, ecbiscores_list } = this.props;
		return (
			<View>
				<DateSelect date={date} onDateChange={date => this.props.sessionUpdate({ prop: "date", value: date })}/>

				<CardSection style={{ flexDirection: "column" }}>
					<Text style={HeaderStyle}>Days of Homework Completed</Text>
					{
						_.map(guardians, (guardian, index) => {
							return (
								<SliderInput
									label={guardian.name}
									value={daysofhomework_list[index]}
									maximumValue={7}
									minimumValue={0}
									step={1}
									onSlidingComplete={value => this.handleDOH.call(this, index, value)}
									onChangeText={value => this.handleDOH.call(this, index, value)}
								/>
							);
						})
					}
				</CardSection>

				<View style={{ flexDirection: "column" }}> 
					<Text style={HeaderStyle}>ECBI Score</Text>
					{
						_.map(guardians, (guardian, index) => {
							return (
								<CardSection style={{ flexDirection: "column" }}>
									<Text style={SubHeaderStyle}>{guardian.name}</Text>
									<IncDecInput 
										label="Intensity"
										value={`${ecbiscores_list[index][0]}`}
										onChangeText={value => this.handleECBI.call(this, index, "Intensity", value)}
										onInc={this.handleIncDec.bind(this, index, "Intensity", "Inc")}
										onDec={this.handleIncDec.bind(this, index, "Intensity", "Dec")}
									/>
									<IncDecInput 
										label="Problem" 
										value={`${ecbiscores_list[index][1]}`}
										onChangeText={value => this.handleECBI.call(this, index, "Problem", value)}
										onInc={this.handleIncDec.bind(this, index, "Problem", "Inc")}
										onDec={this.handleIncDec.bind(this, index, "Problem", "Dec")}
									/>
								</CardSection>
							);
						})
					}
				</View>

				<CardSection style={{ flexDirection: "column" }}>
					<Text style={HeaderStyle}>Completed Forms:</Text>
					{
						_.map(forms_list, (formType) => {
							return (
								<Text style={SubHeaderStyle}>{formType}</Text>
							);
						})
					}
				</CardSection>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { uid, guardians } = state.clientForm;
	const { date, index } = state.session;
	var { daysofhomework, ecbiscores } = state.session;
	const forms = typeof index == "string" ? state.clients[uid].sessions[index].forms : {}; // Temp Fix.

	// Create default values to prevent binding value to an undefined property.
	_.map(guardians, (guardian, index) => {
		if (!daysofhomework[index]){
			daysofhomework[index] = { Days: 0 };
		}
		if (!ecbiscores[index]){
			ecbiscores[index] = { Intensity: 0, Problem: 0 };
		}
	});

	// React doesn't detect object property changes as component prop changes, so objects must be converted to lists.
	forms_list = _.map(forms, (form) => {
		return form.type;
	});
	daysofhomework_list = _.map(daysofhomework, (guardian) => {
		return guardian.Days;
	});
	ecbiscores_list = _.map(ecbiscores, (guardian) => {
		return [guardian.Intensity, guardian.Problem];
	});

	return { guardians, uid, sessionid: index, date, forms_list, daysofhomework, ecbiscores, daysofhomework_list, ecbiscores_list };
};

export default connect(mapStateToProps, { sessionCreate, sessionUpdate, sessionDelete, sessionReset })(SessionForm);
