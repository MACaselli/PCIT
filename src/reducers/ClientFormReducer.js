import {
  CLIENT_UPDATE,
  CLIENT_CREATE,
  CLIENT_RESET,
  CLIENT_SAVE_SUCCESS
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
    case CLIENT_CREATE:
      return INITIAL_STATE;
    case CLIENT_RESET:
      return INITIAL_STATE;
    case CLIENT_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
