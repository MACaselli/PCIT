import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
	FORM_UPDATE,
	FORM_CREATE,
  FORM_RESET,
	FORM_SAVE_SUCCESS,
	FORM_FETCH_SUCCESS,
  FIELD_UPDATE
} from './types';

export const formUpdate = ({ prop, value }) => {
	return {
		type: FORM_UPDATE,
		payload: { prop, value }
	};
}

export const formCreate = ({ name, date, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${uid}/forms`)
      .push({ name, date })
      .then(() => {
        dispatch({ type: FORM_CREATE });
        Actions.pop()
      });
  };
}

export const formReset = () => {
  return {
    type: FORM_RESET
  }
}

export const formFetch = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${uid}/forms`)
      .on('value', snapshot => {
        dispatch({ type: FORM_FETCH_SUCCESS, payload: snapshot.val(), uid });
      });
  };
}

 
export const formSave = ({ name, date, type, form, id, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${uid}/forms/${id}`)
      .update({ name, date, type, form })
      .then(() => {
        dispatch({ type: FORM_SAVE_SUCCESS });
        Actions.pop();
      }); 
  };
}

export const formDelete = ({ id, uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/clients/${uid}/forms/${id}`)
      .remove()
      .then(() => {
        Actions.pop();
      });
  };
}

export const fieldUpdate = ({ field, value, formType }) => {
  return {
    type: FIELD_UPDATE,
    payload: { field, value, formType }
  };
}