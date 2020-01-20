import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../../constants/Colors";
import Order from "./Order";

const Orders = () => {
  return (
    <OrdersWrapper>
      <section>
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
        <Order />
      </section>
    </OrdersWrapper>
  );
};

const OrdersWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${Colors.white};
  padding: 24px;
  border-radius: 8px;
  flex-grow: 1;
  section {
    width: calc(100% - 48px);
    position: absolute;
    height: 100%;
    overflow-y: scroll;
  }
`;
export default Orders;
