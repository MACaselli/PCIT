import _ from 'lodash';
import {
  CLIENTS_FETCH_SUCCESS,
  FORM_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENTS_FETCH_SUCCESS:
      return action.payload;
    case FORM_FETCH_SUCCESS:
      return {...state, [action.uid]: {...state[action.uid], forms: action.payload}};
    default:
      return state;
  }
};
