import { combineReducers } from "redux";
import FormReducer from "./FormReducer";
import SessionReducer from "./SessionReducer";
import ClientFormReducer from "./ClientFormReducer";
import ClientReducer from "./ClientReducer";

export default combineReducers({
	form: FormReducer,
	session: SessionReducer,
	clientForm: ClientFormReducer,
	clients: ClientReducer
});
