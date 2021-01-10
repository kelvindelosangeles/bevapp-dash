import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StyleSheetManager, createGlobalStyle } from "styled-components";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import { HashRouter as Router } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";

import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { createStore, combineReducers, applyMiddleware } from "redux";
import { ReactReduxFirebaseProvider, firebaseReducer, getFirebase } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer, getFirestore } from "redux-firestore"; // <- needed if using firestore

import GlobalState from "./redux/reducers/GlobalState";
import RapidOrderReducer from "./redux/reducers/RapidOrderReducer";
import DashboardReducer from "./redux/reducers/DashboardReducer";
import SpecialPricingReducer from "./redux/reducers/SpecialPricingReducer";
import thunk from "redux-thunk";

// const bevappTest = {
//     apiKey: "AIzaSyCQhOoWbnPMT4YSUAQX5w956l7UPm73tMY",
//     authDomain: "bevapp-test.firebaseapp.com",
//     databaseURL: "https://bevapp-test.firebaseio.com",
//     projectId: "bevapp-test",
//     storageBucket: "bevapp-test.appspot.com",
//     messagingSenderId: "595597165652",
//     appId: "1:595597165652:web:9d09e924376af780cd19c1",
// };

const bevappProduction = {
    apiKey: "AIzaSyBWABm8_-gJAphiDlPJdrbwvZ01Sf2HXc4",
    authDomain: "bevapp-1f1b1.firebaseapp.com",
    databaseURL: "https://bevapp-1f1b1.firebaseio.com",
    projectId: "bevapp-1f1b1",
    storageBucket: "bevapp-1f1b1.appspot.com",
    messagingSenderId: "872130550852",
    appId: "1:872130550852:web:985b31878cea94a2",
};

const fbConfig = {
    ...bevappProduction,
};

const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

firebase.initializeApp(fbConfig);
firebase.firestore(); // <- needed if using firestore

const rootReducer = combineReducers({
    GlobalState: GlobalState,
    DashboardState: DashboardReducer,
    RapidOrderState: RapidOrderReducer,
    SpecialPricingState: SpecialPricingReducer,
    Firebase: firebaseReducer,
    Firestore: firestoreReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(getFirebase, getFirestore))));
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, // <- needed if using firestore
};

let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
});

const GlobalStyle = createGlobalStyle`



p, h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}
a{
    text-decoration: none;
}
.MuiFormControl-root{
    width: -webkit-fill-available;
    cursor: pointer;
}
`;

ReactDOM.render(
    <StyleSheetManager disableVendorPrefixes>
        <Router>
            <Provider store={store}>
                <ReactReduxFirebaseProvider {...rrfProps}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <GlobalStyle />
                        <App />
                    </MuiPickersUtilsProvider>
                </ReactReduxFirebaseProvider>
            </Provider>
        </Router>
    </StyleSheetManager>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
