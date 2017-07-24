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

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
