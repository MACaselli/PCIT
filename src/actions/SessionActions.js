import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { 
	SESSION_CREATE,
	SESSION_UPDATE,
	SESSION_FETCH_SUCCESS,
	SESSION_RESET
} from './types';
import realm from '../schemas/main';

export const sessionUpdate = ({ prop, value }) => {
	return { type: SESSION_UPDATE, payload: { prop, value } }
}

export const sessionReset = () => {

}

export const sessionCreate = ({ uid, date, daysofhomework, ecbiscores }) => {
  daysofhomework = _.map(daysofhomework, (guardian) => {
  	return { Days: parseInt(guardian.Days) }
  })
  ecbiscores = _.map(ecbiscores, (guardian) => {
  	return { Intensity: parseInt(guardian.Intensity), Problem: parseInt(guardian.Problem) }
  });
  
  realm.write(() => {
    let client = realm.objects('User')[0].clients[uid];
    client.sessions.push({ 
    	id: Math.floor(Math.random() * 10000), 
    	date,
    	daysofhomework,
    	ecbiscores
    });
  });

  Actions.sessionList({ type: 'reset' });
  return { type: SESSION_CREATE, payload: realm.objects('User')[0].clients[uid].sessions, uid }
};

export const sessionFetch = ({ uid }) => {
  // Results retrieved directly from a realm must be cleaned into 'plain' objects, so that realms doesn't interfere
  // state changes.
  var result = realm.objects('User').snapshot();
  var plain_result = JSON.parse(JSON.stringify(result[0].clients[uid].sessions)); // Deep copy.
  return { type: SESSION_FETCH_SUCCESS, payload: plain_result, uid}
}