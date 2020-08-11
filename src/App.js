import "./App.css";
import React from "react";
import { compose } from "redux";
import { Route, Switch } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import styled from "styled-components";

import Sidebar from "./Global/Sidebar/Sidebar";
import Dashboard from "./Applications/Dashboard/Dashboard";
import RapidOrder from "./Applications/Rapid Order/RapidOrder";
import Store from "./Applications/Store/Store";
import SpecialPricing from "./Applications/Special Pricing/SpecialPricing";

import Dialog from "@material-ui/core/Dialog";

import Spinner from "./Global/Spinner/Spinner";
import ChangeLog from "./Global/ChangeLog";
import Test from "./test/Test";
import BeverageReport from "./test/Reports/BeverageReport";
import { Colors } from "./Constants/Colors";
import DailyJournalv2 from "./test/Reports/DailyJournalv2";
import ManualTasks from "./test/ManualTasks";

const App = (props) => {
    const toggleChangeLog = () => {
        props.dispatch({ type: "TOGGLE_CHANGE_LOG" });
    };
    const open = useSelector((state) => state.GlobalState.changeLogOpen);

    return !isLoaded(props.inventory) ||
        !isLoaded(props.orders) ||
        !isLoaded(props.allv2Orders) ||
        !isLoaded(props.store) ||
        !isLoaded(props.routes) ? null : ( // <Spinner />
        <SnackbarProvider maxSnack={3}>
            <AppWrapper>
                <Sidebar />
                <Switch>
                    <Route path='/dashboard' component={Dashboard} />
                    <Route path='/rapidorder' component={RapidOrder} />
                    <Route path='/store' component={Store} />
                    <Route path='/specialpricing' component={SpecialPricing} />
                    <Route path='/report1' component={DailyJournalv2} />
                    <Route path='/manualTasks' component={ManualTasks} />
                    {/* <Route path='/test' component={Test} /> */}
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
    grid-template-columns: min-content 1fr;
    grid-template-areas: "sidebar app";
    background-color: ${Colors.navy};
`;

export default compose(
    connect((state) => {
        return {
            inventory: state.Firestore.data.inventory,
            orders: state.Firestore.data.ordersv2,
            store: state.Firestore.data.store,
            routes: state.Firestore.data.routes,
            allv2Orders: state.Firestore.data.allv2Orders,
            // allPrevOrders: state.Firestore.data.allPrevOrders,
        };
    }),
    firestoreConnect(() => {
        return [
            { collection: "inventory" },
            { collection: "ordersv2", doc: "orders" },
            { collection: "store" },
            { collection: "routes" },
            { collection: "ordersv2", storeAs: "allv2Orders" },
            // { collection: "orders", storeAs: "allPrevOrders" },
        ];
    })
)(App);
