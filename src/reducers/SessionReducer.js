import { 
	SESSION_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  id: 0,
  date: '',
  daysofhomework: {},
  ecbiscores: {},
  forms: {},
  index: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case SESSION_UPDATE:
       return {...state, [action.payload.prop]: action.payload.value  }
    default:
      return state;
  }
};
