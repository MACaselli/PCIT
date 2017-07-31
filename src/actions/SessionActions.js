import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
	SESSION_FETCH_SUCCESS
} from './types';
import realm from '../schemas/main';

export const sessionCreate = ({ name, DOB, gender, phone, email, shift }) => {
  realm.write(() => {
    let user = realm.objects('User')[0]
    user.clients.push({ id: Math.floor(Math.random() * 10000), name, DOB, gender, phone, email, shift });
  });

  Actions.clientList({ type: 'reset' });
  return { type: CLIENT_CREATE, payload: realm.objects('User')[0].clients }
};

export const sessionFetch = ({ uid }) => {
  return { type: SESSION_FETCH_SUCCESS, payload: realm.objects('User')[0].clients[uid].sessions, uid}
}