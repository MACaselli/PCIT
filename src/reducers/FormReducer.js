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
} from '../actions/types';

const INITIAL_STATE = {
  attendees: {},
  type: '',
  timer: 0,
  fields: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case FORM_UPDATE:
  		  return { ...state, [action.payload.prop]: action.payload.value };
  	case FORM_CREATE:
  		return INITIAL_STATE;
    case FORM_RESET:
      return INITIAL_STATE;
  	case FORM_SAVE_SUCCESS:
  		return INITIAL_STATE;

    case FIELD_INITIALIZE:
      return { ...state, fields: action.payload.fields }
    case FIELD_UPDATE:
      return { ...state, fields: { ...state.fields, [action.payload.field]: action.payload.value } }

    case TIMER_TICK:
      return { ...state, timer: state.timer + 1 }
    case TIMER_RESET:
      return { ...state, timer: 0 }
    default:
      return state;
  }
};
