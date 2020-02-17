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
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 2fr;
  grid-template-rows: 1fr;
  grid-gap: 48px;
  padding: 0 24px;
  margin-bottom: 24px;
  p {
    /* width: 180px; */
    /* margin-right: 24px; */
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    color: ${Colors.black};
    font-size: 14;
  }
`;

export default _OrderHeader;
