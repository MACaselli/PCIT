import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import FormListItem from 'components/FormListItem';
import { formFetch } from 'actions';

class FormList extends Component {
 componentWillMount() {
    const { uid } = this.props;
    this.props.formFetch({ uid });
    this.formatForms(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.formatForms(nextProps);
  }

  formatForms({ clients, uid }){
  	const forms = _.map(clients[uid]['forms'], (val, id) => {
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

  renderRow(form) {
    return <FormListItem form={form} />;
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

export default connect(mapStateToProps, { formFetch })(FormList);