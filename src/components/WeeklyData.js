import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text } from 'react-native';
import { VictoryChart, VictoryGroup, VictoryLine, VictoryLabel, VictoryLegend } from 'victory-native';
import _ from 'lodash';
import { CardSection } from './common';


class WeeklyData extends Component {
  componentWillMount() {
  }

  render() {
  	const { DOH, Intensity, Problem, Names } = this.props;
  	const colors = ['#2196f3', '#4caf50', '#ffc107', '#ff5722', '#673ab7', '#f44336'];

    return (
      <ScrollView>
      	<CardSection style={{ flexDirection: 'column' }}>
      		<Text style={{ textAlign: 'center', fontSize: 20 }}>Days Of Homework</Text>
					<VictoryChart>
						{
							_.map(DOH, (guardianDOH, index) => {
								return (
								<VictoryGroup>
									<VictoryLine
								    style={{
								      data: { stroke: colors[index] },
								      parent: { border: "1px solid #ccc"}
								    }}
								    data={guardianDOH}
									/>
								</VictoryGroup>
								);
							})
						}
					<VictoryLegend
					  data={Names}
					    padding={5}
					    colorScale={colors}
					/>
					</VictoryChart>
				</CardSection>
      	<CardSection style={{ flexDirection: 'column' }}>
      		<Text style={{ textAlign: 'center', fontSize: 20 }}>Intensity</Text>
					<VictoryChart>
						{
							_.map(Intensity, (guardianIntensity, index) => {
								return (
								<VictoryGroup>
									<VictoryLine
								    style={{
								      data: { stroke: colors[index] },
								      parent: { border: "1px solid #ccc"}
								    }}
								    data={guardianIntensity}
									/>
								</VictoryGroup>
								);
							})
						}
					<VictoryLegend
					  data={Names}
					    padding={5}
					    colorScale={colors}
					/>
					</VictoryChart>
				</CardSection>
      	<CardSection style={{ flexDirection: 'column' }}>
      		<Text style={{ textAlign: 'center', fontSize: 20 }}>Problem</Text>
					<VictoryChart>
						{
							_.map(Problem, (guardianProblem, index) => {
								return (
								<VictoryGroup>
									<VictoryLine
								    style={{
								      data: { stroke: colors[index] },
								      parent: { border: "1px solid #ccc"}
								    }}
								    data={guardianProblem}
									/>
								</VictoryGroup>
								);
							})
						}
					<VictoryLegend
					  data={Names}
					    padding={5}
					    colorScale={colors}
					/>
					</VictoryChart>
				</CardSection>
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
	})

	return DOH;
}

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
	})

	return { Intensity, Problem };
}

const mapNamesToLegend = (guardians) => {
	return _.map(guardians, (guardian) => {
		return { name: guardian.name, symbol: { type: 'circle' } }
	})
}

const mapStateToProps = state => {
	const { uid, guardians } = state.clientForm;
	const sessions = state.clients[uid].sessions; // Temp fix.
	const DOH = mapDOHToChart(sessions);
	const { Intensity, Problem } = mapECBIToChart(sessions);
	const Names = mapNamesToLegend(guardians);

  return { DOH, Intensity, Problem, Names };
};

export default connect(mapStateToProps)(WeeklyData);
