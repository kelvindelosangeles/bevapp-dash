import "./App.css";
import React from "react";
import { compose } from "redux";
import { NavLink, Route, Switch } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";
import { firestoreConnect, isLoaded, useFirestoreConnect } from "react-redux-firebase";
import { Colors } from "./Constants/Colors";
import styled from "styled-components";
import Sidebar from "./Global/Sidebar/Sidebar";
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
import DriverJournal from "./Applications/Reports/DriverJournal";
import AccountOverview from "./v5/pages/AccountOverview";
import PostSummary from "./v5/pages/PostSummary";
import DBOrders from "./Applications/Dashboard/DBOrders/DBOrders";
import DBDrafts from "./Applications/Dashboard/DBDrafts/Drafts";

import ActiveRoutes from "./Applications/Dashboard/DBRoutes/ActiveRoutes";
import CompletedOrders from "./Applications/Dashboard/completedOrders/CompletedOrders";
import Login from "./v5/pages/Login";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./v5/helpers/Auth";
import Settings from "./v5/components/Settings";

const App = (props) => {
    // const uid = useSelector((state) => state.Firebase.auth.uid);
    // useFirestoreConnect({ collection: `users`, doc: uid, storeAs: "user" });
    const toggleChangeLog = () => {
        props.dispatch({ type: "TOGGLE_CHANGE_LOG" });
    };
    const open = useSelector((state) => state.GlobalState.changeLogOpen);

    return !isLoaded(props.inventory) || !isLoaded(props.orders) || !isLoaded(props.store) || !isLoaded(props.routes) ? null : ( // <Spinner />
        <SnackbarProvider maxSnack={3}>
            <AppWrapper>
                <Sidebar />
                <TempNav />
                <Switch>
                    <Route path='/' component={UserIsAuthenticated(DBOrders)} exact />
                    {/* TODO: Rename to Dashboard */}
                    <Route path='/login' component={UserIsNotAuthenticated(Login)} />
                    <Route path='/rapidorder' component={UserIsAuthenticated(RapidOrder)} />
                    <Route path='/drafts' component={UserIsAuthenticated(DBDrafts)} />
                    <Route path='/routes' component={UserIsAuthenticated(ActiveRoutes)} />
                    {/* TODO: Rename to Routes */}
                    <Route path='/store' component={UserIsAuthenticated(Store)} />
                    <Route path='/specialpricing' component={UserIsAuthenticated(SpecialPricing)} />
                    <Route path='/completedorders' component={CompletedOrders} />
                    {/* TODO: Unprotected Route */}
                    {/* =====
                    Accounts 
                    ===== */}
                    <Route path='/accountOverview' component={UserIsAuthenticated(AccountOverview)} />
                    <Route path='/postSummary' component={UserIsAuthenticated(PostSummary)} />
                    {/* =====
                    Reports
                    ===== */}
                    <Route path='/cps' component={UserIsAuthenticated(CustomerPurchaseSheet)} />
                    <Route path='/nor' component={UserIsAuthenticated(NonOrderReport)} />
                    <Route path='/wj' component={UserIsAuthenticated(WeeklyJournal)} />
                    <Route path='/sobi' component={UserIsAuthenticated(SOBI)} />
                    <Route path='/dj' component={UserIsAuthenticated(DriverJournal)} />
                    <Route path='/test' component={UserIsAuthenticated(Manual)} />
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
                <Settings />
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
        grid-template-columns: auto 1fr;
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
