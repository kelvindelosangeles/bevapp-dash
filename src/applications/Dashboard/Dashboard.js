import React from "react";

import { connect } from "react-redux";
import styled from "styled-components";

import DBStatBar from "./components/DBStatBar";
import DBOrderHeader from "./components/DBOrderHeader";
import Orders from "./components/Orders/Orders";
import DBPreview from "./components/DBPreview";
import EmptyOrder from "../../Global/Empty Order/EmptyOrder";

const Dashboard = ({ activeOrder }) => {
  const OrderPreview = activeOrder ? (
    <DBPreview order={activeOrder} />
  ) : (
    <EmptyOrder message="Select an order to view it's details" />
  );
  return (
    <DashboardWrapper>
      <DBStatBar />
      <DBOrderHeader />
      <Orders />
      {OrderPreview}
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 390px;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    "statbar preview"
    "orderheader preview"
    "orders preview";
`;

export default connect(state => {
  return { activeOrder: state.DashboardState.activeOrder };
})(Dashboard);
