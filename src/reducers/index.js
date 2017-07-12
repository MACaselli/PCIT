import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ClientFormReducer from './ClientFormReducer';
import ClientReducer from './ClientReducer';
import FormReducer from './FormReducer';

export default combineReducers({
  auth: AuthReducer,
  clientForm: ClientFormReducer,
  form: FormReducer,
  clients: ClientReducer
});
