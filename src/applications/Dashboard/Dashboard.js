import React from "react";
import { Route, Switch } from "react-router-dom";
import DBOrders from "./DBOrders/DBOrders";
import ActiveRoutes from "./DBRoutes/ActiveRoutes";
import Drafts from "./DBDrafts/Drafts";
import CompletedOrders from "./completedOrders/CompletedOrders";

const Dashboard = () => {
    return (
        <Switch>
            <Route exact path='/dashboard' component={DBOrders} />
            <Route exact path='/dashboard/drafts' component={Drafts} />
            <Route path='/dashboard/routes' component={ActiveRoutes} />
            <Route path='/dashboard/completedorders' component={CompletedOrders} />
        </Switch>
    );
};

export default Dashboard;
