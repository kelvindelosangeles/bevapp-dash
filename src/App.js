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

// import { customers } from "./Assets/Data/Customers";

const App = props => {
  const test = () => {
    props.firestore
      .set(
        {
          collection: "test",
          doc: "my doc"
        },
        {
          ARI1GA: {
            brand: "Arizona",
            category: "juice",
            description: "Arizona 1 gallon",
            flavors: [
              "fruit punch",
              "mango",
              "grape",
              "kiwi",
              "iced tea",
              "half & half"
            ],
            id: "ARI1GA",
            packaging: "bottle",
            price: "11.99",
            size: "1 gallon"
          },
          ARI20B: {
            brand: "Arizona",
            category: "juice",
            description: "Arizona 20oz bottle",
            id: "ARI20B",
            packaging: "bottle",
            price: "17.39",
            size: "20oz"
          },
          ARI24C: {
            brand: "Arizona",
            category: "juice",
            description: "Arizona 24oz can",
            id: "ARI24C",
            packaging: "can",
            price: "17.49",
            size: "24oz"
          },
          ASA12B: {
            brand: "Asahi",
            category: "beer",
            description: "Asahi 12oz bottle",
            id: "ASA12B",
            packaging: "bottle",
            price: "36.39",
            size: "12oz"
          },
          ASA22B: {
            brand: "Asahi",
            category: "beer",
            description: "Asahi 22oz bottle",
            id: "ASA22B",
            packaging: "bottle",
            price: "40.49",
            size: "22oz"
          }
        }
      )
      .then(e => {
        console.log(e);
        console.log("success");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return !isLoaded(props.inventory) ||
    !isLoaded(props.orders) ||
    !isLoaded(props.test) ||
    !isLoaded(props.store) ? null : ( // <Spinner />
    <AppWrapper>
      <Sidebar />
      <AppContainer>
        <button onClick={test}>TEST</button>
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
      test: state.Firestore.data.test,
      store: state.Firestore.data.store
    };
  }),
  firestoreConnect(() => {
    return [
      { collection: "inventory" },
      { collection: "orders" },
      { collection: "test" },
      { collection: "store" }
    ];
  })
)(App);
