import {
  CLIENT_UPDATE,
  CLIENT_RESET
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENT_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CLIENT_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};
