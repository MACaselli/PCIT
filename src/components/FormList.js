import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import FormListItem from './FormListItem';

/*
this.props.client = { name: 'test1',
				      phone: '212322222',
				      shift: 'Thursday',
				      uid: '-KmHhWnU_vPOAVBTyPtO',
				      forms: {
						Kslkgjh: {
							field1: test,
							field2: test
						},
						sldkgj: {
							field1: true,
							field2: true
						}
				      }
				    }
*/

class FormList extends Component {
 componentWillMount() {
    this.formatForms(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.formatForms(nextProps);
  }

  formatForms({ client }){
  	const forms = _.map(client.forms, (val, id) => {
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

export default FormList;