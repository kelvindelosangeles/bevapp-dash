import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Colors } from "../../../../Constants/Colors";
import Order from "./Order";

const Orders = ({ orders, complete, search }) => {
  const OrdersArray = Object.values(orders)
    .sort((a, b) => {
      return a.details && a.details.orderID > b.details.orderID && -1;
    })
    .filter(x => {
      // filters based on order completion
      return x.details && x.details.complete === complete;
    })
    .filter(y => {
      // filters based on the search
      return (
        y.details.orderID.includes(search) ||
        y.details.createdAt.toUpperCase().includes(search)
      );
      // return y.details.orderID.contains(search);
    })
    .map(i => {
      // because were using the ordered dataset and it inlcudes an id
      return i.details && <Order order={i} key={i} />;
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
    /* padding: 24px; */
    position: absolute;
    height: 100%;
    overflow-y: scroll;
  }
`;
export default connect(state => {
  return { orders: state.Firestore.data.orders.orders };
})(Orders);
