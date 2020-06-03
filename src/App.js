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
import { connect, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import { SnackbarProvider } from "notistack";

import Spinner from "./Global/Spinner/Spinner";
import ChangeLog from "./Global/ChangeLog";
import Task2 from "./Global/Tasks/Task2";
import Task1 from "./Global/Tasks/Task1";
import Test from "./test/Test";
import CustomersToReachOutTo from "./test/Reports/CustomersToReachOutTo";
import BeverageReport from "./test/Reports/BeverageReport";

const App = (props) => {
    const toggleChangeLog = () => {
        props.dispatch({ type: "TOGGLE_CHANGE_LOG" });
    };
    const open = useSelector((state) => state.GlobalState.changeLogOpen);

    return !isLoaded(props.inventory) || !isLoaded(props.orders) || !isLoaded(props.store) ? null : ( // <Spinner />
        <SnackbarProvider maxSnack={3}>
            <AppWrapper>
                <Sidebar />
                <AppHeader />
                <Switch>
                    <Route path='/dashboard' component={Dashboard} />
                    <Route path='/rapidorder' component={RapidOrder} />
                    <Route path='/store' component={Store} />
                    <Route path='/specialpricing' component={SpecialPricing} />
                    <Route path='/task1' component={Task1} />
                    <Route path='/task2' component={Task2} />
                    <Route path='/test' component={Test} />
                    {/* <Route path='/report1' component={CustomersToReachOutTo} /> */}
                    {/* <Route path='/report2' component={BeverageReport} /> */}
                </Switch>
                <Dialog
                    open={open}
                    onClose={toggleChangeLog}
                    scroll='paper'
                    fullWidth
                    aria-labelledby='scroll-dialog-title'
                    aria-describedby='scroll-dialog-description'>
                    <ChangeLog />
                </Dialog>
            </AppWrapper>
        </SnackbarProvider>
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
    connect((state) => {
        return {
            inventory: state.Firestore.data.inventory,
            orders: state.Firestore.data.orders,
            store: state.Firestore.data.store,
        };
    }),
    firestoreConnect(() => {
        // return [{ collection: "inventory" }, { collection: "orders", doc: "orders" }, { collection: "store" }];
        return [{ collection: "inventory" }, { collection: "orders" }, { collection: "store" }];
    })
)(App);
