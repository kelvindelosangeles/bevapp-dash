import React from "react";

import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

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
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 2fr;
  grid-template-rows: 1fr;
  grid-gap: 48px;
  padding: 0 24px;
  margin-bottom: 24px;
  p {
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    color: ${Colors.black};
    font-size: 14;
  }
`;

export default _DBOrderHeader;
