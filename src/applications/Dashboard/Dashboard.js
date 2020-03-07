import React from "react";

import { connect } from "react-redux";
import styled from "styled-components";

import DBStatBar from "./components/DBStatBar";
import DBOrderHeader from "./components/DBOrderHeader";
import Orders from "./components/Orders/Orders";
import DBPreview from "./components/DBPreview";
import EmptyOrder from "../../Global/Empty Order/EmptyOrder";

const Dashboard = ({ activeOrder, sidebarExpanded }) => {
  const OrderPreview = activeOrder ? (
    <DBPreview activeOrder={activeOrder} />
  ) : (
    <EmptyOrder message="Select an order to view it's details" />
  );
  return (
    <DashboardWrapper expand={sidebarExpanded}>
      <DBStatBar />
      <DBOrderHeader />
      <Orders />
      {OrderPreview}
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
