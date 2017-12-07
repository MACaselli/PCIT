import {
	CLIENT_UPDATE,
	CLIENT_RESET
} from "actions/types";

const INITIAL_STATE = {
	name: "",
	phone: "",
	shift: "",
	guardians: {
		0: {
			name: ""
		}
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CLIENT_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case CLIENT_RESET:
			return JSON.parse(JSON.stringify(INITIAL_STATE)); // Deep copy
		default:
			return state;
	}
};
