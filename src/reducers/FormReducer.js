import { 
	FORM_UPDATE,
	FORM_CREATE,
  FORM_RESET,
	FORM_SAVE_SUCCESS,
  FIELD_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  date: '',
  id: '',
  type: 'PDI',
  forms: {
      PDI: {
        mother: false,
        father: false,
        DC: false,
        IC: false,
        NoOp: false,
        Obey1: false,
        Disobey1: false,
        LP1: false,
        UP1: false,
        ChWarn: false,
        Obey2: false,
        Disobey2: false,
        LP2: false,
        UP2: false,
        ToCh: '',
        StayOn: false,
        GetsOff: false,
        Obey3: false,
        Disobey3: false
      },
      CDI: {
        mother: false,
        father: false,
        other: false,
        neutraltalk: '',
        behaviordescription: '',
        reflection: '',
        labeledpraise: '',
        unlabeledpraise: '',
        questions: '',
        commands: '',
        negativetalk: '',
        satisfactory1: false,
        needspractice1: false,
        satisfactory2: false,
        needspractice2: false,
        satisfactory3: false,
        needspractice3: false,
        notapplicable: false,
        notes: ''
      } 
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	case FORM_UPDATE:
      if (action.payload.prop == 'form'){
        if (action.payload.type == 'PDI'){
          return { ...state, forms: { ...state.forms, PDI: action.payload.value } }
        }
        else if (action.payload.type == 'CDI'){
          return { ...state, forms: { ...state.forms, CDI: action.payload.value } }
        }
      }
      else{
  		  return { ...state, [action.payload.prop]: action.payload.value };
      }
  	case FORM_CREATE:
  		return INITIAL_STATE;
    case FORM_RESET:
      return INITIAL_STATE;
  	case FORM_SAVE_SUCCESS:
  		return INITIAL_STATE;
    case FIELD_UPDATE:
      if (action.payload.formType == 'PDI'){
        return { ...state, forms: { ...state.forms, PDI: { ...state.forms.PDI, [action.payload.field]: action.payload.value } } }
      }
      else if (action.payload.formType == 'CDI'){
        return { ...state, forms: { ...state.forms, CDI: { ...state.forms.CDI, [action.payload.field]: action.payload.value } } }
      }
    default:
      return state;
  }
};
