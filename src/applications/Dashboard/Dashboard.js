import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import NewOrders from "./Routes/NewOrders";
import CompletedOrders from "./Routes/CompletedOrders";

const Dashboard = () => {
  return (
    <Switch>
      <Route exact path="/dashboard/" component={NewOrders} />
      <Route path="/dashboard/completedorders" component={CompletedOrders} />
    </Switch>
  );
};

export default connect(state => {
  return {
    activeOrder: state.DashboardState.activeOrder
  };
})(Dashboard);
