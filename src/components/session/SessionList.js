import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'realm/react-native';
import SessionListItem from './SessionListItem';
import { sessionFetch } from '../../actions';

class SessionList extends Component {
  componentWillMount() {
    const { uid } = this.props;
    this.props.sessionFetch({ uid });
    this.formatSessions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.formatSessions(nextProps);
  }

  formatSessions({ clients, uid }){
    const forms = _.map(clients[uid]['sessions'], (val, id) => {
      return {...val, id}
    })

    this.createDataSource(forms);
  }

  createDataSource(forms) {
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(forms);
  }

  renderRow(session) {
    return <SessionListItem session={session} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {clients: state.clients};
}

export default connect(mapStateToProps, { sessionFetch })(SessionList);