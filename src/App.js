import "./App.css";
import React from "react";
import { compose } from "redux";
import { NavLink, Route, Switch } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { Colors } from "./Constants/Colors";
import styled from "styled-components";
import Sidebar from "./Global/Sidebar/Sidebar";
import Dashboard from "./Applications/Dashboard/Dashboard";
import RapidOrder from "./Applications/Rapid Order/RapidOrder";
import Store from "./Applications/Store/Store";
import SpecialPricing from "./Applications/Special Pricing/SpecialPricing";
import Dialog from "@material-ui/core/Dialog";
import Spinner from "./Global/Spinner/Spinner";
import ChangeLog from "./Global/ChangeLog";
import DailyJournalv2 from "./test/Reports/DailyJournalv2";
import Manual from "./test/Manual";
import NonOrderReport from "./Applications/Reports/NonOrderReport";
import CustomerPurchaseSheet from "./Applications/Reports/CustomerPurchaseSheet";
import BeverageReport from "./Applications/Reports/BeverageReport";
import WeeklyJournal from "./Applications/Reports/WeeklyJournal";
import { hot } from "react-hot-loader/root";
import ResponsiveBlock from "./componentsv3/responsive block";
import TempNav from "./componentsv3/temp/TempNav";
import Test from "./test/test";
import SOBI from "./Applications/Reports/SOBI";

const App = (props) => {
    const toggleChangeLog = () => {
        props.dispatch({ type: "TOGGLE_CHANGE_LOG" });
    };
    const open = useSelector((state) => state.GlobalState.changeLogOpen);

    return !isLoaded(props.inventory) ||
        !isLoaded(props.orders) ||
        // !isLoaded(props.allv2Orders) ||
        // !isLoaded(props.collToDelete) ||
        !isLoaded(props.store) ||
        !isLoaded(props.routes) ? null : ( // <Spinner />
        <SnackbarProvider maxSnack={3}>
            <AppWrapper>
                <Sidebar />
                <TempNav />
                <Switch>
                    <Route path='/dashboard' component={Dashboard} />
                    <Route path='/rapidorder' component={RapidOrder} />
                    <Route path='/store' component={Store} />
                    <Route path='/specialpricing' component={SpecialPricing} />
                    {/* <Route path='/report1' component={DailyJournalv2} /> */}
                    <Route path='/cps' component={CustomerPurchaseSheet} />
                    <Route path='/nor' component={NonOrderReport} />
                    <Route path='/wj' component={WeeklyJournal} />
                    {/* <Route path='/bev' component={BeverageReport} /> */}
                    <Route path='/sobi' component={SOBI} />
                    {/* <Route path='/manual' component={Test} /> */}
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
    min-height: calc(var(--vh, 1vh) * 100);
    width: 100vw;
    background-color: ${Colors.navy};
    @media (min-width: 768px) {
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
        display: grid;
        grid-template-columns: min-content 1fr;
        grid-template-areas: "sidebar app";
    }
`;

export default compose(
    connect((state) => {
        return {
            inventory: state.Firestore.data.inventory,
            orders: state.Firestore.data.ordersv2,
            store: state.Firestore.data.store,
            routes: state.Firestore.data.routes,
            // allv2Orders: state.Firestore.data.allv2Orders,
            // collToDelete: state.Firestore.data.collToDelete,
        };
    }),
    firestoreConnect(() => {
        return [
            { collection: "inventory" },
            { collection: "ordersv2", doc: "orders" },
            { collection: "store" },
            { collection: "routes" },
            // { collection: "ordersv2", storeAs: "allv2Orders" },
            // { collection: "orders", storeAs: "collToDelete" },
        ];
    })
)(process.env.NODE_ENV === "development" ? hot(App) : App);

// TODO: Prepapre for mobile rsponsiveness.  for now the app is prepped to work as it did for web and broken for mobile to accomodate each page as is
