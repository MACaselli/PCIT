import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text } from "react-native";
import { VictoryChart, VictoryGroup, VictoryLine, VictoryLabel, VictoryLegend, VictoryAxis } from "victory-native";
import _ from "lodash";
import { CardSection } from "common";


class WeeklyData extends Component {
	renderChart(data, domain, title){
  	const { Ticks, Names } = this.props;
  	const colors = ["#2196f3", "#4caf50", "#ffc107", "#ff5722", "#673ab7", "#f44336"];

  	return (
	  	<CardSection style={{ flexDirection: "column" }}>
	  		<Text style={{ textAlign: "center", fontSize: 20 }}>{title}</Text>
				<VictoryChart>
					<VictoryAxis 
						tickValues={Ticks}
						tickFormat={t => `${t.split(".")[0]}`}
						tickLabelComponent={<VictoryLabel dy={10} />}
					/>
					<VictoryAxis domain={{ y: domain }} dependentAxis />
					{
						_.map(data, (guardianData, index) => {
							return (
								<VictoryGroup>
									<VictoryLine
								    style={{
								      data: { stroke: colors[index] },
								      parent: { border: "1px solid #ccc"}
								    }}
								    labels={datum => "\u25CF"}
								    labelComponent={<VictoryLabel renderInPortal dy={-15} />}
								    data={guardianData}
									/>
								</VictoryGroup>
							);
						})
					}
					<VictoryLegend
					  data={Names}
					  padding={5}
					  colorScale={colors}
					  orientation='horizontal'
					  y={232}
					/>
				</VictoryChart>
			</CardSection>
		);
	}

	render() {
  	const { DOH, Intensity, Problem } = this.props;

		return (
			<ScrollView>
      	{ this.renderChart.call(this, DOH, [1, 7], "Days of Homework") }
      	{ this.renderChart.call(this, Intensity, [36, 252], "Intensity")}
      	{ this.renderChart.call(this, Problem, [0, 36], "Problem") }
			</ScrollView>
		);
	}
}

const mapDOHToChart = (sessions) => {
	var DOH = {};
	_.each(sessions, (session, sessionIndex) => {
		_.each(session.daysofhomework, (days, index) => {
			if(!DOH[index]){
				DOH[index] = [];
			}
			DOH[index].push({ x: sessionIndex, y: days.Days });
		});
	});
	return DOH;
};

const mapECBIToChart = (sessions) => {
	var Intensity = {};
	var Problem = {};
	_.each(sessions, (session, sessionIndex) => {
		_.each(session.ecbiscores, (scores, index) => {
			if(!Intensity[index]){
				Intensity[index] = [];
			}
			if(!Problem[index]){
				Problem[index] = [];
			}
			Intensity[index].push({ x: sessionIndex, y: scores.Intensity });
			Problem[index].push({ x: sessionIndex, y: scores.Problem });
		});
	});
	return { Intensity, Problem };
};

const mapDatesToTicks = (sessions) => {
	// VictoryAxis only allows unique labels as values, and therefore multiple duplicate dates can't directly
	// be used. Therefore, in order to display one date multiple times, we attached a unique index to the
	// end of each date within a set of duplicates, and use the tickFormat prop to render the index out later.
	var repetition = 0;
	var last = "";
	return _.map(_.map(sessions, session => session.date).sort(),
	 (date) => {
			if (date == last){
				repetition += 1;
			}
			else {
				repetition = 0;
			}
			last = date;
			return `${date}.${repetition}`;
		});
};

const mapNamesToLegend = (guardians) => {
	return _.map(guardians, (guardian) => {
		return { name: guardian.name, symbol: { type: "circle" } };
	});
};

const mapStateToProps = state => {
	const { uid, guardians } = state.clientForm;
	const sessions = state.clients[uid].sessions; // Temp fix.
	const DOH = mapDOHToChart(sessions);
	const { Intensity, Problem } = mapECBIToChart(sessions);
	const Ticks = mapDatesToTicks(sessions);
	const Names = mapNamesToLegend(guardians);

	return { DOH, Intensity, Problem, Ticks, Names };
};

export default connect(mapStateToProps)(WeeklyData);
