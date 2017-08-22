import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { 
	FORM_UPDATE,
	FORM_CREATE,
  FORM_RESET,
	FORM_SAVE_SUCCESS,
	FORM_FETCH_SUCCESS,
  FIELD_INITIALIZE,
  FIELD_UPDATE,
  TIMER_START,
  TIMER_TICK,
  TIMER_STOP,
  TIMER_RESET,
} from './types';
import realm from '../schemas/main';

export const formUpdate = ({ prop, value }) => {
	return {
		type: FORM_UPDATE,
		payload: { prop, value }
	};
}
export const formCreate = ({ uid, sessionid, attendees, type, fields }) => {
  attendees = _.map(attendees, (attendee) => {
    return {
      name: attendee.name
    }
  });
  fields = _.map(fields, (field, name) => {
    return {
      name,
      value: String(field.value)
    }
  });
  realm.write(() => {
    let session = realm.objects('User')[0].clients[uid].sessions[sessionid];
    session.forms.push({
      type,
      guardians: attendees,
      fields
    })
  })
  return { type: 'test' }
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
export const formReset = () => {
  return {
    type: FORM_RESET
  }
}

// TIMER
let timer = null;
export const timerStart = () => {
  return (dispatch) => {
    clearInterval(timer);
    timer = setInterval(() => dispatch(timerTick()), 1000);
  }
}
export const timerTick = () => {
  return { type: TIMER_TICK }
}
export const timerStop = () => {
  clearInterval(timer);
  return { type: TIMER_STOP }
}
export const timerReset = () => {
  return { type: TIMER_RESET }
}

// FIELDS
export const fieldInitialize = ({ formType }) => {
  var fields = {};
  switch(formType){
    case 'PrePost/ChildLed':
    case 'PrePost/ParentLed':
    case 'PrePost/CleanUp':
      fields = PREPOST_FIELDS;
      break;
    case 'CDI':
      fields = CDI_FIELDS;
      break;
    case 'PDI':
      fields = PDI_FIELDS;
      break;
  }
  return { type: FIELD_INITIALIZE, payload: { fields } }
}
export const fieldUpdate = ({ field, value }) => {
  return {
    type: FIELD_UPDATE,
    payload: { field, value }
  };
}

const PREPOST_FIELDS = {
  neutralTalk: 0,
  behaviorDescription: 0,
  reflection: 0,
  labeledPraise: 0,
  unlabeledPraise: 0,
  question: 0,
  negativeTalk: 0,
  dcComply: 0,
  dcNoncomply: 0,
  dcNoOpportunity: 0,
  idcComply: 0,
  idcNoncomply: 0,
  idcNoOpportunity: 0,
  interactionTypicalYes: false,
  interactionTypicalNo: false,
  notes: ''
}

const CDI_FIELDS = {
  neutralTalk: 0,
  behaviorDescription: 0,
  reflection: 0,
  labeledPraise: 0,
  unlabeledPraise: 0,
  question: 0,
  commands: 0,
  negativeTalk: 0,
  imitateSatisfactory: false,
  imitateNeedsPractice: false,
  useEnthusiasmSatisfactory: false,
  useEnthusiasmNeedsPractice: false,
  ignoreDisruptiveBehaviorSatisfactory: false,
  ignoreDisruptiveBehaviorNeedsPractice: false,
  ignoreDisruptiveBehaviorNotApplicable: false,
  notes: ''
}

const PDI_FIELDS = {} 