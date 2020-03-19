import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import NewOrders from "./Routes/NewOrders";
import CompletedOrders from "./Routes/CompletedOrders";

const Dashboard = ({ sidebarExpanded }) => {
  return (
    <DashboardWrapper expand={sidebarExpanded}>
      <Switch>
        <Route to="dashboard/" component={NewOrders} />
        <Route to="dashboard/completedorders" component={CompletedOrders} />
      </Switch>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  grid-area: app;
  display: grid;
  height: 100%;
  grid-template-columns: ${({ expand }) =>
    expand ? "1fr 390px" : "1fr 500px"};
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    "statbar preview"
    "orderheader preview"
    "orders preview";
`;

export default connect(state => {
  return {
    activeOrder: state.DashboardState.activeOrder,
    sidebarExpanded: state.GlobalState.sidebarExpanded
  };
})(Dashboard);
