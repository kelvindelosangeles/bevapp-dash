import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Colors } from "../../../../constants/Colors";
import Order from "./Order";

const Orders = ({ orders }) => {
  const OrdersArray = Object.values(orders).map(i => {
    return <Order orderDetails={i} />;
  });

  return (
    <OrdersWrapper>
      <section>{OrdersArray}</section>
    </OrdersWrapper>
  );
};

const OrdersWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${Colors.white};
  border-radius: 8px;
  flex-grow: 1;
  section {
    width: 100%;
    padding: 24px 0;
    position: absolute;
    height: 100%;
    overflow-y: scroll;
  }
`;
export default connect(state => {
  return { orders: state.DashboardState.orders };
})(Orders);
