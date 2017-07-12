import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  CLIENT_UPDATE,
  CLIENT_CREATE,
  CLIENT_RESET,
  CLIENTS_FETCH_SUCCESS,
  CLIENT_SAVE_SUCCESS
} from './types';

export const clientUpdate = ({ prop, value }) => {
  return {
    type: CLIENT_UPDATE,
    payload: { prop, value }
  };
};

export const clientCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: CLIENT_CREATE });
        Actions.clientList({ type: 'reset' });
      });
  };
};

export const clientReset = () => {
  return {
    type: CLIENT_RESET
  }
}

export const clientsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients`)
      .on('value', snapshot => {
        dispatch({ type: CLIENTS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const clientSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${uid}`)
      .update({ name, phone, shift })
      .then(() => {
        dispatch({ type: CLIENT_SAVE_SUCCESS });
        Actions.clientList({ type: 'reset' });
      });
  };
};

export const clientDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`users/${currentUser.uid}/clients/${uid}`)
      .remove()
      .then(() => {
        Actions.clientList({ type: 'reset' });
      });
  };
};
