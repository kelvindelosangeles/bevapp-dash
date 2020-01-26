import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

const EmptyOrder = () => {
  return (
    <EmptyOrderWrapper>
      <p>Add an item to create a new order</p>
    </EmptyOrderWrapper>
  );
};

const EmptyOrderWrapper = styled.div`
  grid-area: rorder;
  background-color: ${Colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    font-size: 14px;
  }
`;

export default EmptyOrder;
