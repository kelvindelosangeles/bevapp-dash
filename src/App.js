import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Sidebar from "./Global/Sidebar/Sidebar";
import AppHeader from "./Global/AppHeader/AppHeader";
import Dashboard from "./Applications/Dashboard/Dashboard";
import RapidOrder from "./Applications/Rapid Order/RapidOrder";

import { Colors } from "./Constants/Colors";
import Store from "./Applications/Store/Store";
import SpecialPricing from "./Applications/Special Pricing/SpecialPricing";

import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import Spinner from "./Global/Spinner/Spinner";

const App = props => {
  return !isLoaded(props.inventory) ||
    !isLoaded(props.orders) ||
    // !isLoaded(props.test) ||
    !isLoaded(props.store) ? null : ( // <Spinner />
    <AppWrapper>
      <Sidebar />
      <AppContainer>
        <AppHeader />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/rapidorder" component={RapidOrder} />
          <Route path="/store" component={Store} />
          <Route path="/specialpricing" component={SpecialPricing} />
        </Switch>
      </AppContainer>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  min-height: 800px;
  min-width: 1430px;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${Colors.lightGrey};
`;

export default compose(
  connect(state => {
    return {
      inventory: state.Firestore.data.inventory,
      orders: state.Firestore.data.orders,
      // test: state.Firestore.data.test,
      store: state.Firestore.data.store
    };
  }),
  firestoreConnect(() => {
    return [
      { collection: "inventory" },
      { collection: "orders" },
      // { collection: "test" },
      { collection: "store" }
    ];
  })
)(App);
