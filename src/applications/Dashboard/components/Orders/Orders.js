import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Colors } from "../../../../Constants/Colors";
import Order from "./Order";

const Orders = ({ newOrders }) => {
  const OrdersArray = Object.values(newOrders).map(i => {
    return <Order newOrder={i} />;
  });

  return (
    <OrdersWrapper>
      <section>{OrdersArray}</section>
    </OrdersWrapper>
  );
};

const OrdersWrapper = styled.div`
  grid-area: orders;
  margin: 24px;
  position: relative;
  overflow: hidden;
  background-color: ${Colors.white};
  border-radius: 8px;
  section {
    width: 100%;
    padding: 24px 0;
    position: absolute;
    height: 100%;
    overflow-y: scroll;
  }
`;
export default connect(state => {
  return { newOrders: state.DashboardState.newOrders };
})(Orders);
