import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter as Router } from "react-router-dom";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import GlobalState from "./redux/reducers/GlobalState";
import RapidOrderReducer from "./redux/reducers/RapidOrderReducer";
import DashboardReducer from "./redux/reducers/DashboardReducer";

const rootReducer = combineReducers({
  GlobalState: GlobalState,
  RapidOrderState: RapidOrderReducer,
  DashboardState: DashboardReducer
});

const initialState = {};

const store = createStore(rootReducer, initialState, composeWithDevTools());

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
