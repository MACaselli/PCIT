import { Actions } from "react-native-router-flux";
import _ from "lodash";
import { 
	FORM_UPDATE,
	FORM_CREATE,
	FORM_RESET,
	FORM_SAVE_SUCCESS,
	FORM_FETCH_SUCCESS,
	FIELD_INITIALIZE,
	FIELD_UPDATE,
	PDI_FIELD_INITIALIZE,
	PDI_FIELD_UPDATE,
	PDI_NEW_LOOP,
	TIMER_START,
	TIMER_TICK,
	TIMER_STOP,
	TIMER_RESET,
} from "./types";
import realm from "schemas/main";

export const formUpdate = ({ prop, value }) => {
	return {
		type: FORM_UPDATE,
		payload: { prop, value }
	};
};
export const formCreate = ({ uid, sessionid, attendee, type, fields, sequences }) => {
	if(type !== "PDI"){
		fields = _.map(fields, (field, name) => {
			return {
				name,
				value: String(field)
			};
		});
		realm.write(() => {
			let session = realm.objects("User")[0].clients[uid].sessions[sessionid];
			session.forms.push({
				type,
				attendee: { name: attendee },
				fields,
				sequences: []
			});
		});
		return { type: FORM_CREATE, payload: retrieveForms(uid, sessionid), uid, sessionid };
	}	else {
		// PDI forms must be handled separately due to nested nature (PDI -> Sequences -> TimeOutLoops)
		sequences = _.map(sequences, (sequence, index) => {
			const { fields, timeOutLoops } = processFields(sequence);
			return {
				index,
				fields,
				timeOutLoops 
			};
		});
		realm.write(() => {
			let session = realm.objects("User")[0].clients[uid].sessions[sessionid];
			session.forms.push({
				type,
				attendee: { name: attendee },
				fields: [],
				sequences
			});
		});
		return { type: FORM_CREATE, payload: retrieveForms(uid, sessionid), uid, sessionid };
	}
};
function processFields(fields){
	// Take object with both fields and time out loops and return separate *fields* and *timeOutLoops* lists
	let fieldList = [];
	let timeOutLoops = [];
	_.each(fields, (field, name) => {
		if(name !== "timeOutLoops"){
			fieldList.push({ name, value: String(field) });
		} else {
			// Use processFields on *timeOutLoop* object since it contains fields
			timeOutLoops = _.map(field, (loop, index) => {
				return {
					index,
					fields: processFields(loop).fields
				};
			});
		}
	});
	return { fields: fieldList, timeOutLoops };
}
export const formFetch = ({ uid }) => {
	// const { currentUser } = firebase.auth();

	// return (dispatch) => {
	//   firebase.database().ref(`/users/${currentUser.uid}/clients/${uid}/forms`)
	//     .on('value', snapshot => {
	//       dispatch({ type: FORM_FETCH_SUCCESS, payload: snapshot.val(), uid });
	//     });
	// };
};
export const formSave = ({ name, date, type, form, id, uid }) => {
	// const { currentUser } = firebase.auth();

	// return (dispatch) => {
	//   firebase.database().ref(`/users/${currentUser.uid}/clients/${uid}/forms/${id}`)
	//     .update({ name, date, type, form })
	//     .then(() => {
	//       dispatch({ type: FORM_SAVE_SUCCESS });
	//       Actions.pop();
	//     }); 
	// };
};
export const formDelete = ({ id, uid }) => {
	// const { currentUser } = firebase.auth();

	// return () => {
	//   firebase.database().ref(`/users/${currentUser.uid}/clients/${uid}/forms/${id}`)
	//     .remove()
	//     .then(() => {
	//       Actions.pop();
	//     });
	// };
};
export const formReset = () => {
	return {
		type: FORM_RESET
	};
};
const retrieveForms = (uid, sessionID) => {
	// Results retrieved directly from a realm must be cleaned into 'plain' objects, so that realms doesn't interfere
	// state changes.
	var result = realm.objects("User").snapshot();
	var plain_result = JSON.parse(JSON.stringify(result[0].clients[uid].sessions[sessionID].forms)); // Deep copy.
	return plain_result;
}; 

// TIMER
let timers = {
	0: null,
	1: null
};
export const timerStart = (instance) => {
	return (dispatch) => {
		clearInterval(timers[instance]);
		timers[instance] = setInterval(() => dispatch(timerTick(instance)), 1000);
	};
};
export const timerTick = (instance) => {
	return { type: TIMER_TICK, payload: { instance }};
};
export const timerStop = (instance) => {
	clearInterval(timers[instance]);
	return { type: TIMER_STOP };
};
export const timerReset = (instance) => {
	return { type: TIMER_RESET, payload: { instance }};
};

// FIELDS
export const fieldInitialize = ({ formType }) => {
	var fields = {};
	switch(formType){
		case "Pre/ChildLed":
		case "Pre/ParentLed":
		case "Pre/CleanUp":
		case "Post/ChildLed":
		case "Post/ParentLed":
		case "Post/CleanUp":
			fields = PREPOST_FIELDS;
			break;
		case "CDI":
			fields = CDI_FIELDS;
			break;
		// case "PDI":
		// 	fields = PDI_BASE;
		// 	fields.sequences[0] = PDI_FIELDS;
		// 	break;
	}
	return { type: FIELD_INITIALIZE, payload: { fields } };
};
export const fieldUpdate = ({ field, value }) => {
	return {
		type: FIELD_UPDATE,
		payload: { field, value }
	};
};

// PDI Fields
export const pdiFieldInitialize = () => {
	let base = {...PDI_BASE};
	return { type: PDI_FIELD_INITIALIZE, payload: { base } };
};
export const pdiFieldUpdate = ({ field, value, isTimeout=false }) => {
	return {
		type: PDI_FIELD_UPDATE,
		payload: { field, value, isTimeout }
	};
};
export const pdiNewLoop = ({ type }) => {
	let fields;
	switch (type){
		case "sequence":
			// timeOutLoops must be shadowed or else only the reference to PDI_FIELDS.timeOutLoops will be passed.
			fields = {...PDI_FIELDS, timeOutLoops: [...PDI_FIELDS.timeOutLoops]};
			break;
		case "timeout":
			fields = {...PDI_TIMEOUT_FIELDS};
			break;
		default:
			fields = {};
	}
	return { 
		type: PDI_NEW_LOOP,
		payload: { type, fields }
	};
};


const PREPOST_FIELDS = {
	neutralTalk: 0,
	behaviorDescription: 0,
	reflection: 0,
	labeledPraise: 0,
	unlabeledPraise: 0,
	question: 0,
	negativeTalk: 0,
	dcComply: 0,
	dcNonComply: 0,
	dcNoOpportunity: 0,
	idcComply: 0,
	idcNonComply: 0,
	idcNoOpportunity: 0,
	interactionTypical: "Yes",
	notes: ""
};

const CDI_FIELDS = {
	neutralTalk: 0,
	behaviorDescription: 0,
	reflection: 0,
	labeledPraise: 0,
	unlabeledPraise: 0,
	question: 0,
	commands: 0,
	negativeTalk: 0,
	imitate: "",
	useEnthusiasm: "",
	ignoreDisruptiveBehavior: "",
	notes: ""
};

const PDI_BASE = {
	sequences: []
};

const PDI_FIELDS = {
	DcIc: "",
	Effective: false,
	NoOpportunity: false,
	Obey1: "",
	Obey2: "",
	Obey3: "",
	Praise: "",
	ChairWarning: "",
	timeOutLoops: [],
	ParentConfirm: false
};

const PDI_TIMEOUT_FIELDS = {
	TimeoutChair: "",
	TimeoutRoom: ""			
};