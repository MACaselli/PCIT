import { 
	FORM_UPDATE,
	FORM_CREATE,
  FORM_RESET,
	FORM_SAVE_SUCCESS,
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

// const PrePost_Fields = {

// }

// const PDI_Fields = {
//   DC: false,
//   IC: false,
//   NoOp: false,
//   Obey1: false,
//   Disobey1: false,
//   LP1: false,
//   UP1: false,
//   ChWarn: false,
//   Obey2: false,
//   Disobey2: false,
//   LP2: false,
//   UP2: false,
//   ToCh: '',
//   StayOn: false,
//   GetsOff: false,
//   Obey3: false,
//   Disobey3: false,
//   notes: ''
// }

// const CDI_Fields = {
//   neutraltalk: '',
//   behaviordescription: '',
//   reflection: '',
//   labeledpraise: '',
//   unlabeledpraise: '',
//   questions: '',
//   commands: '',
//   negativetalk: '',
//   satisfactory1: false,
//   needspractice1: false,
//   satisfactory2: false,
//   needspractice2: false,
//   satisfactory3: false,
//   needspractice3: false,
//   notapplicable: false,
//   notes: ''
// } 



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
    case FIELD_UPDATE:
      return { ...state, fields: { ...state.fields, [action.payload.field]: { ...state.fields[action.payload.field], value: action.payload.value} } }
    case TIMER_TICK:
      return { ...state, timer: state.timer + 1 }
    case TIMER_RESET:
      return { ...state, timer: 0 }
    default:
      return state;
  }
};
