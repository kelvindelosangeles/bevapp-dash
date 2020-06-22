import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import DBCompletedOrders from "./Sub Applications/DBCompletedOrders";

import DBOrders from "./Sub Applications/DBOrders";
import Routes from "./Sub Applications/Routes/Routes";

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
