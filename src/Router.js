import React from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ClientList from './components/ClientList';
import ClientCreate from './components/ClientCreate';
import ClientEdit from './components/ClientEdit';
import FormList from './components/FormList';
import FormEdit from './components/FormEdit';
import FormCreate from './components/FormCreate';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth" initial >
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>

      <Scene key="main" >
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
          key="formList" 
          component={FormList} 
          title="Forms"
          onRight={() => Actions.formCreate()}
          rightTitle="Add"
        />
        <Scene key="formCreate" component={FormCreate} title="Create Form" />
        <Scene key="formEdit" component={FormEdit} title="Edit Form"/>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
