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
import { useEffect } from "react";
import { firestore } from "firebase";

const App = (props) => {
    const toggleChangeLog = () => {
        props.dispatch({ type: "TOGGLE_CHANGE_LOG" });
    };
    const open = useSelector((state) => state.GlobalState.changeLogOpen);

    // useEffect(() => {
    //     const customer = {
    //         a123temp: {
    //             active: false,
    //             address: "4011 East Tremont",
    //             city: "bx",
    //             cr: "cod",
    //             name: "Bella Deli Market Corp",
    //             sla: "1302378",
    //             telephone: "3472083685",
    //             id: "a123temp",
    //         },
    //     };
    //     console.log(customer);

    //     props.firestore
    //         .update(
    //             {
    //                 collection: "store",
    //                 doc: "customers",
    //             },
    //             customer
    //         )
    //         .then(() => {
    //             console.log("success");
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

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
        return [{ collection: "inventory" }, { collection: "orders" }, { collection: "store" }];
    })
)(App);
