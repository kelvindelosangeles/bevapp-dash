import React from "react";

import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";

const _DBOrderHeader = () => {
  return (
    <DBOrderHeader>
      <p>Order</p>
      <p>Store</p>
      <p>Total</p>
    </DBOrderHeader>
  );
};

const DBOrderHeader = styled.div`
  grid-area: orderheader;
  display: grid;
  grid-template-columns: 100px 2fr 1fr 2fr;
  grid-template-rows: 1fr;
  grid-gap: 48px;
  padding: 0 48px;
  margin: 24px;
  margin-bottom: 0;
  p {
    font-family: "AvenirNext-Bold";
    color: ${Colors.black};
    font-size: 14;
  }
`;

export default _DBOrderHeader;
