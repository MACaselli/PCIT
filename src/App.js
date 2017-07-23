import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Reactotron from 'reactotron-react-native';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';
import realm from './schemas/main';
import './ReactotronConfig';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBjxpAs5WAWc2b7jBlk9DmjLHK1D705RJA',
      authDomain: 'manager-7623b.firebaseapp.com',
      databaseURL: 'https://manager-7623b.firebaseio.com',
      storageBucket: 'manager-7623b.appspot.com',
      messagingSenderId: '140341674791'
    };

    // Initialize initial user
    if (realm.objects('User').length === 0){
      realm.write(() => {
        realm.create('User', {
          id: Math.floor(Math.random() * 100)
        });
      });
    }

    if (firebase.apps.length === 0){
      firebase.initializeApp(config);
    }  
  }

  render() {
    const store = (__DEV__) ? Reactotron.createStore(reducers, {}, applyMiddleware(ReduxThunk)) : createStore(reducers, {}, applyMiddleware(ReduxThunk));

    // let realm = new Realm({
    //   schema: [{ name: 'Owl', primaryKey: 'id', properties: { id: 'int', name: 'string' }}]
    // });

    // realm.write(() => {
    //   // realm.create('Owl', {id: Math.floor(Math.random() * 1000), name: '346654'});
    //   realm.objectForPrimaryKey('Owl', 277).name = 'Awesome';
    //   console.log(realm.objects('Owl'));
    // });

    realm.write(() => {
      // realm.deleteAll();
      // console.log(realm.objects('User'),realm.objects('Client'),realm.objects('Session'),realm.objects('Form'),realm.objects('Guardian'))
      ////////////////////////////////////////
      // let user = realm.create('User', {
      //   id: Math.floor(Math.random() * 10)
      // });

      // console.log(realm.objects('User')[0]);

      /////////////////////////////////////////

      // // Start; Create user.
      // let user = realm.create('User', {
      //   id: Math.floor(Math.random() * 10000)  
      // });

      // // Add Client
      // user.clients.push({
      //   id: Math.floor(Math.random() * 10000),
      //   name: 'bob',
      //   DOB: new Date(),
      //   gender: 'Male',
      //   phone: 7,
      //   email: 'bob@test.com',
      //   shift: 'wednesday',
      // });

      // // Add Session
      // user.clients[0].sessions.push({
      //   id: Math.floor(Math.random() * 10000),
      //   date: new Date(),
      //   daysofhomework: 8,
      //   ecbiscore: 40,
      // });

      // // Add Form
      // user.clients[0].sessions[0].forms.push({
      //   id: Math.floor(Math.random() * 10000),
      //   type: 'PDI',
      //   date: 30,
      // });

      // // Add Guardian
      // user.clients[0].sessions[0].forms[0].attendees.push({
      //   id: 10,
      //   name: "Bob"
      // });

      // console.log(realm.objects('User'));
      // console.log(realm.objects('Client'));
      /////////////////////////////////////////

      // let session = realm.create('Session', {
      //   id: Math.floor(Math.random() * 10000),
      //   date: new Date(),
      //   daysofhomework: 7,
      //   ecbiscore: 35
      // });

      // session.forms.push({
      //   id: Math.floor(Math.random() * 10000),
      //   type: 'PDI',
      //   date: 30
      // });

      // session.forms[0].attendees.push({ 
      //   id: Math.floor(Math.random() * 10000),
      //   name: "SubTEST"
      // });

      // console.log(realm.objects('Session'));

      /////////////////////////////////////////

      // let form = realm.create('Form', {
      //   id: Math.floor(Math.random() * 10000),
      //   type: 'PDI',
      //   date: 28
      // });

      // form.attendees.push({ 
      //   id: Math.floor(Math.random() * 10000),
      //   name: 'Test'
      // });

      // console.log(realm.objects('Form'));
    });

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
