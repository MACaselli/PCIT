import { 
	FORM_UPDATE,
	FORM_CREATE,
	FORM_RESET,
	FORM_SAVE_SUCCESS,
	FIELD_INITIALIZE,
	FIELD_UPDATE,
	PDI_FIELD_INITIALIZE,
	PDI_FIELD_UPDATE,
	PDI_NEW_LOOP,
	TIMER_START,
	TIMER_TICK,
	TIMER_STOP,
	TIMER_RESET,
} from "actions/types";

const INITIAL_STATE = {
	attendee: "",
	type: "",
	timers: {
		0: {
			time: 0
		},
		1: { 
			time: 0
		}
	},
	fields: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FORM_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case FORM_CREATE:
		case FORM_RESET:
		case FORM_SAVE_SUCCESS:
			return JSON.parse(JSON.stringify(INITIAL_STATE)); // Deep copy

		case FIELD_INITIALIZE:
			return { ...state, fields: action.payload.fields };
		case FIELD_UPDATE:
			return { ...state, fields: { ...state.fields, [action.payload.field]: action.payload.value } };

		case PDI_FIELD_INITIALIZE:
			return { ...state, ...action.payload.base };
		case PDI_FIELD_UPDATE: {
			let sequences = [ ...state.sequences ];
			if(!action.payload.isTimeout){
				sequences[sequences.length - 1] = { ...sequences[sequences.length - 1], [action.payload.field]: action.payload.value };
			} else{
				sequences[sequences.length - 1].timeOutLoops[sequences[sequences.length - 1].timeOutLoops.length - 1] = { ...sequences[sequences.length - 1].timeOutLoops[sequences[sequences.length - 1].timeOutLoops.length - 1], [action.payload.field]: action.payload.value };
			}
			return { ...state, sequences };
		}

		case PDI_NEW_LOOP: {
			let sequences = [ ...state.sequences ];
			switch (action.payload.type){
				case "sequence":
					sequences.push(action.payload.fields);
					return { ...state, sequences: sequences};
				case "timeout": 
					sequences[sequences.length - 1].timeOutLoops.push(action.payload.fields);
					return { ...state, sequences: sequences};
				default:
					return state;
			}
		}

		case TIMER_TICK:
			return { ...state, timers: { ...state.timers, [action.payload.instance]: { time: state.timers[action.payload.instance].time + 1 }}};
		case TIMER_RESET:
			return { ...state, timers: { ...state.timers, [action.payload.instance]: { time: 0 }}};
		default:
			return state;
	}
};
