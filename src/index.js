import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { HashRouter as Router } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";

import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { createStore, combineReducers } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore

import GlobalState from "./redux/reducers/GlobalState";
import RapidOrderReducer from "./redux/reducers/RapidOrderReducer";
import DashboardReducer from "./redux/reducers/DashboardReducer";

const fbConfig = {
  apiKey: "AIzaSyBWABm8_-gJAphiDlPJdrbwvZ01Sf2HXc4",
  authDomain: "bevapp-1f1b1.firebaseapp.com",
  databaseURL: "https://bevapp-1f1b1.firebaseio.com",
  projectId: "bevapp-1f1b1",
  storageBucket: "bevapp-1f1b1.appspot.com",
  messagingSenderId: "872130550852",
  appId: "1:872130550852:web:985b31878cea94a2"
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

firebase.initializeApp(fbConfig);
firebase.firestore(); // <- needed if using firestore

const rootReducer = combineReducers({
  GlobalState: GlobalState,
  DashboardState: DashboardReducer,
  RapidOrderState: RapidOrderReducer,
  Firebase: firebaseReducer,
  Firestore: firestoreReducer
});

const initialState = {};

const store = createStore(rootReducer, initialState, composeWithDevTools());

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
