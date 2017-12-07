import { 
	SESSION_UPDATE,
	SESSION_RESET
} from "actions/types";

const INITIAL_STATE = {
	id: 0,
	date: "",
	daysofhomework: {},
	ecbiscores: {},
	forms: {},
	index: 0
};

export default (state = INITIAL_STATE, action) => {
	console.log(action.type, INITIAL_STATE);
	switch (action.type) {
	case SESSION_UPDATE:
		return {...state, [action.payload.prop]: action.payload.value };
	case SESSION_RESET:
		return JSON.parse(JSON.stringify(INITIAL_STATE)); // Deep copy
	default:
		return state;
	}
};
