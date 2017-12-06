import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Reactotron from "reactotron-react-native";
import ReduxThunk from "redux-thunk";
import firebase from "firebase";
import reducers from "./reducers";
import Router from "./Router";
import realm from "./schemas/main";
import "./ReactotronConfig";

class App extends Component {
	componentWillMount() {
		// Initialize initial user
		if (realm.objects("User").length === 0){
			realm.write(() => {
				realm.create("User", {
					id: Math.floor(Math.random() * 100)
				});
			});
		}  
	}

	render() {
		const store = (__DEV__) ? Reactotron.createStore(reducers, {}, applyMiddleware(ReduxThunk)) : createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;
