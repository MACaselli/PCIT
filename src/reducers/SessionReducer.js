import { 
	FORM_UPDATE,
	FORM_CREATE,
  FORM_RESET,
	FORM_SAVE_SUCCESS,
  FIELD_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case FORM_UPDATE:
    default:
      return state;
  }
};
