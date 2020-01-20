import React from "react";

import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

const _OrderHeader = () => {
  return (
    <OrderHeader>
      <p>Order</p>
      <p>Store</p>
      <p>Total</p>
    </OrderHeader>
  );
};

const OrderHeader = styled.div`
  display: flex;
  padding: 0 24px;
  margin-bottom: 24px;
  p {
    width: 180px;
    margin-right: 24px;
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    color: ${Colors.black};
    font-size: 14;
  }
`;

export default _OrderHeader;
