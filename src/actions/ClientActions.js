import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  CLIENT_UPDATE,
  CLIENT_CREATE,
  CLIENT_RESET,
  CLIENTS_FETCH_SUCCESS,
  CLIENT_SAVE_SUCCESS
} from './types';
import realm from '../schemas/main';

export const clientUpdate = ({ prop, value }) => {
  return {
    type: CLIENT_UPDATE,
    payload: { prop, value }
  };
};

export const clientCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();

  realm.write(() => {
    let user = realm.objects('User')[0]
    user.clients.push({ id: Math.floor(Math.random() * 10000), name, phone, shift });
  });

  Actions.clientList({ type: 'reset' });

  return { type: CLIENT_CREATE };
};

export const clientReset = () => {
  return {
    type: CLIENT_RESET
  }
}

export const clientsFetch = () => {
  const { currentUser } = firebase.auth();

  return { type: CLIENTS_FETCH_SUCCESS, payload: realm.objects('User')[0].clients }
};

export const clientSave = ({ name, phone, shift, uid }) => {
  const client = realm.objects('User')[0].clients[uid];

  realm.write(() => {
    client.name = name;
    client.phone = phone;
    client.shift = shift;
  });

  Actions.clientList({ type: 'reset' });
  return { type: CLIENT_SAVE_SUCCESS };
};

export const clientDelete = ({ uid }) => {
  const client = realm.objects('User')[0].clients[uid];

  realm.write(() => {
    realm.delete(client);
  })

  Actions.clientList({ type: 'reset' });

  return { type: CLIENT_RESET };
};
