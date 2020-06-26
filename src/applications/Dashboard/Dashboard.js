import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import DBCompletedOrders from "./subApplications/DBCompletedOrders";
import DBOrders from "./subApplications/DBOrders";
import ActiveRoutes from "./subApplications/Routes/ActiveRoutes";
import Drafts from "./Drafts";

const Dashboard = () => {
    return (
        <Switch>
            <Route exact path='/dashboard' component={DBOrders} />
            <Route exact path='/dashboard/drafts' component={Drafts} />
            <Route path='/dashboard/routes' component={ActiveRoutes} />
            <Route path='/dashboard/CompletedOrders' component={DBCompletedOrders} />
        </Switch>
    );
};

export default Dashboard;
