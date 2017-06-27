import { 
	FORM_UPDATE,
	FORM_CREATE,
	FORM_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  id: '',
  type: 'PDI'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case FORM_UPDATE:
  		return { ...state, [action.payload.prop]: action.payload.value };
  	case FORM_CREATE:
  		return INITIAL_STATE;
  	case FORM_SAVE_SUCCESS:
  		return INITIAL_STATE;
    default:
      return state;
  }
};
