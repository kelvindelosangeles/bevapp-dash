import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Colors } from "../../../../Constants/Colors";
import Order from "./Order";

const Orders = ({ orders }) => {
  const OrdersArray = orders.map(i => {
    return <Order order={i} key={i} />;
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
    padding: 24px;
    position: absolute;
    height: 100%;
    overflow-y: scroll;
  }
`;
export default connect(state => {
  return { orders: state.Firestore.ordered.orders };
})(Orders);
