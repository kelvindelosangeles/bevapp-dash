import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import "./App.css";

import AppHeader from "./Global/AppHeader/AppHeader";
import Sidebar from "./Global/Sidebar/Sidebar";
import Dashboard from "./Applications/Dashboard/Dashboard";
import RapidOrder from "./Applications/Rapid Order/RapidOrder";
import Store from "./Applications/Store/Store";
import SpecialPricing from "./Applications/Special Pricing/SpecialPricing";

import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import Spinner from "./Global/Spinner/Spinner";
const App = props => {
    // TEST MODE

    return !isLoaded(props.inventory) || !isLoaded(props.orders) || !isLoaded(props.store) ? null : ( // <Spinner />
        <AppWrapper>
            <Sidebar />
            <AppHeader />
            <Switch>
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/rapidorder' component={RapidOrder} />
                <Route path='/store' component={Store} />
                <Route path='/specialpricing' component={SpecialPricing} />
            </Switch>
        </AppWrapper>
    );
};

const AppWrapper = styled.div`
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    width: 100vw;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
        "sidebar appheader"
        "sidebar app";
`;

export default compose(
    connect(state => {
        return {
            inventory: state.Firestore.data.inventory,
            orders: state.Firestore.data.orders,
            store: state.Firestore.data.store
        };
    }),
    firestoreConnect(() => {
        return [{ collection: "inventory" }, { collection: "orders" }, { collection: "store" }];
    })
)(App);
