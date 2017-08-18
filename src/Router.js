import React from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ClientList from './components/ClientList';
import ClientCreate from './components/ClientCreate';
import ClientEdit from './components/ClientEdit';
import SessionList from './components/session/SessionList';
import SessionEdit from './components/session/SessionEdit';
import SessionInfo from './components/session/SessionInfo';
import CodingChoice from './components/session/CodingChoice';
import PrePostChoose from './components/session/choices/PrePostChoose';
import CodingBegin from './components/session/choices/CodingBegin';
import PrePostForm from './components/forms/PrePostForm/PrePostForm';
import PrePostFollowup from './components/forms/PrePostForm/PrePostFollowup';
import CDIForm from './components/forms/CDIForm/CDIForm';
import CDIFollowup from './components/forms/CDIForm/CDIFollowup';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="main" initial>
        <Scene
          key="clientList"
          component={ClientList}
          title="Clients"
          onRight={() => Actions.clientCreate()}
          rightTitle="Add"
          initial
        />
        <Scene key="clientCreate" component={ClientCreate} title="Create Client" />
        <Scene key="clientEdit" component={ClientEdit} title="Edit Client" />

        <Scene 
          key="sessionList" 
          component={SessionList} 
          title="Session Overview"
          onRight={() => Actions.sessionInfo()}
          rightTitle="New"
        />
        <Scene key="sessionInfo" component={SessionInfo} title="Session Information" />

        <Scene key="codingChoice" component={CodingChoice} title="Select Coding Form" />
        <Scene key="prePostChoose" component={PrePostChoose} title="Session Information" />
        <Scene key="codingBegin" component={CodingBegin} title="Session Information" />

        <Scene key="sessionEdit" component={SessionEdit} title="Edit Session" />

        <Scene key="prePostForm" component={PrePostForm} title="Session Information" />
        <Scene key="prePostFollowup" component={PrePostFollowup} title="Session Information" />

        <Scene key="cdiForm" component={CDIForm} title="Session Information" />
        <Scene key="cdiFollowup" component={CDIFollowup} title="Session Information" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
