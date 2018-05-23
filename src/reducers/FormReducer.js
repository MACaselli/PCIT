import { 
	FORM_UPDATE,
	FORM_CREATE,
	FORM_RESET,
	FORM_SAVE_SUCCESS,
	FIELD_INITIALIZE,
	FIELD_UPDATE,
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

		case TIMER_TICK:
			return { ...state, timers: { ...state.timers, [action.payload.instance]: { time: state.timers[action.payload.instance].time + 1 }}};
		case TIMER_RESET:
			return { ...state, timers: { ...state.timers, [action.payload.instance]: { time: 0 }}};
		default:
			return state;
	}
};
