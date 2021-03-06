import { 
	SESSION_UPDATE,
	SESSION_RESET,
	FORM_CREATE
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
	switch (action.type) {
		case SESSION_UPDATE:
			return {...state, [action.payload.prop]: action.payload.value };
		case SESSION_RESET:
			return JSON.parse(JSON.stringify(INITIAL_STATE)); // Deep copy
			
		case FORM_CREATE:
			return {...state, forms: action.payload };
		default:
			return state;
	}
};
