import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';


class WeeklyData extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(WeeklyData);
