import _ from "lodash";
import { Actions } from "react-native-router-flux";
import {
	CLIENT_UPDATE,
	CLIENT_CREATE,
	CLIENT_DELETE,
	CLIENT_RESET,
	CLIENTS_FETCH_SUCCESS,
	CLIENT_SAVE_SUCCESS
} from "./types";
import realm from "schemas/main";

export const clientUpdate = ({ prop, value }) => {
	return {
		type: CLIENT_UPDATE,
		payload: { prop, value }
	};
};

export const clientCreate = ({ name, DOB, gender, guardians, phone, email, shift }) => {
	// Realms requires object lists to be pushed as arrays of objects.
	guardians = _.map(guardians, (guardian) => { return { name: guardian.name }; });

	realm.write(() => {
		let user = realm.objects("User")[0];
		user.clients.push({ 
			id: Math.floor(Math.random() * 10000), 
			name, 
			DOB, 
			gender, 
			guardians, 
			phone, 
			email, 
			shift 
		});
	});

	Actions.clientList({ type: "reset" });
	return { type: CLIENT_CREATE, payload: realm.objects("User")[0].clients };
};

export const clientReset = () => {
	return {
		type: CLIENT_RESET
	};
};

export const clientsFetch = () => {
	// Results retrieved directly from a realm must be cleaned into 'plain' objects, so that realms doesn't interfere
	// state changes.
	var result = realm.objects("User").snapshot();
	var plain_result = JSON.parse(JSON.stringify(result[0].clients)); // Deep copy.
	return { type: CLIENTS_FETCH_SUCCESS, payload: plain_result };
};

export const clientSave = ({ name, DOB, gender, guardians, phone, email, shift, uid }) => {
	const client = realm.objects("User")[0].clients[uid];

	// Realms requires object lists to be pushed as arrays of objects.
	guardians = _.map(guardians, (guardian) => { return { name: guardian.name }; });

	realm.write(() => {
		client.name = name;
		client.DOB = DOB;
		client.gender = gender;
		client.guardians = guardians;
		client.phone = phone;
		client.email = email;
		client.shift = shift;
	});

	return (dispatch) => {
		dispatch({ type: CLIENT_SAVE_SUCCESS, payload: realm.objects("User")[0].clients });
		Actions.clientList({ type: "reset" });
	};
};

export const clientDelete = ({ uid }) => {
	const client = realm.objects("User")[0].clients[uid];

	realm.write(() => {
		realm.delete(client);
	});

	Actions.clientList({ type: "reset" });
	return { type: CLIENT_DELETE, payload: realm.objects("User")[0].clients };
};
