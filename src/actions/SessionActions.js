import { Actions } from "react-native-router-flux";
import _ from "lodash";
import { 
	SESSION_CREATE,
	SESSION_SAVE,
	SESSION_UPDATE,
	SESSION_DELETE,
	SESSION_FETCH_SUCCESS,
	SESSION_RESET
} from "./types";
import realm from "schemas/main";

export const sessionUpdate = ({ prop, value }) => {
	return { type: SESSION_UPDATE, payload: { prop, value } };
};

export const sessionCreate = ({ uid, date, daysofhomework, ecbiscores }) => {
	var { daysofhomework, ecbiscores } = formatObjects(daysofhomework, ecbiscores);
	let client = realm.objects("User")[0].clients[uid];
	realm.write(() => {
		client.sessions.push({ 
    	id: Math.floor(Math.random() * 10000), 
    	date,
    	daysofhomework,
    	ecbiscores
		});
	});

	Actions.pop({ type: "reset" });
	return { type: SESSION_CREATE, payload: retrieveSessions(uid), uid };
};

export const sessionSave= ({ uid, sessionid, date, daysofhomework, ecbiscores }) => {
	var { daysofhomework, ecbiscores } = formatObjects(daysofhomework, ecbiscores);
	let session = realm.objects("User")[0].clients[uid].sessions[sessionid];
	realm.write(() => {
		session.date = date;
		session.daysofhomework = daysofhomework;
		session.ecbiscores = ecbiscores;
	});

	Actions.pop({ type: "reset" });
	return { type: SESSION_SAVE, payload: retrieveSessions(uid), uid };
};

export const sessionDelete = ({ uid, sessionid }) => {
	let session = realm.objects("User")[0].clients[uid].sessions[sessionid];
	realm.write(() => {
		realm.delete(session);
	});
	Actions.pop({ type: "reset" });
	return { type: SESSION_DELETE, payload: retrieveSessions(uid), uid };
};

export const sessionFetch = ({ uid }) => {
	return { type: SESSION_FETCH_SUCCESS, payload: retrieveSessions(uid), uid};
};

export const sessionReset = () => {
	return { type: SESSION_RESET };
};

const formatObjects = (daysofhomework, ecbiscores) => {
	daysofhomework = _.map(daysofhomework, (guardian) => {
		return { Days: parseInt(guardian.Days) };
	});
	ecbiscores = _.map(ecbiscores, (guardian) => {
		return { Intensity: parseInt(guardian.Intensity), Problem: parseInt(guardian.Problem) };
	});
	return { daysofhomework, ecbiscores };
};

const retrieveSessions = (uid) => {
	// Results retrieved directly from a realm must be cleaned into 'plain' objects, so that realms doesn't interfere
	// state changes.
	var result = realm.objects("User").snapshot();
	var plain_result = JSON.parse(JSON.stringify(result[0].clients[uid].sessions)); // Deep copy.
	return plain_result;
}; 