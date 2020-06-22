import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";

import DBOrders from "./Routes/DBOrders";
import Routes from "./Routes/Routes";
import DBCompletedOrders from "./Routes/DBCompletedOrders.js";

const Dashboard = () => {
    return (
        <Switch>
            <Route exact path='/dashboard' component={DBOrders} />
            <Route path='/dashboard/routes' component={Routes} />
            <Route path='/dashboard/CompletedOrders' component={DBCompletedOrders} />
        </Switch>
    );
};

export default Dashboard;
