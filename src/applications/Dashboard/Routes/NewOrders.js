import React from "react";
import styled from "styled-components";
import DBStatBar from "../Components/DBStatBar";
import DBOrderHeader from "../Components/DBOrderHeader";
import { connect } from "react-redux";
import DBPreview from "../Components/DBPreview";
import EmptyOrder from "../../../Global/Empty Order/EmptyOrder";
import Orders from "../Components/Orders/Orders";

const NewOrders = ({ activeOrder }) => {
  const OrderPreview = activeOrder ? (
    <DBPreview activeOrder={activeOrder} />
  ) : (
    <EmptyOrder message="Select an order to view it's details" />
  );

  return (
    <DashboardGrid>
      <DBStatBar />
      <DBOrderHeader />
      <Orders />
      {OrderPreview}
    </DashboardGrid>
  );
};

const DashboardGrid = styled.div`
  grid-area: app;
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
  return {
    activeOrder: state.DashboardState.activeOrder
  };
})(NewOrders);
