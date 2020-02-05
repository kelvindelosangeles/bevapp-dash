import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

const EmptyOrder = ({ message }) => {
  return (
    <EmptyOrderWrapper>
      <p>{message}</p>
    </EmptyOrderWrapper>
  );
};

const EmptyOrderWrapper = styled.div`
  grid-area: rorder;
  background-color: ${Colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  p {
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    font-size: 14px;
  }
`;

export default EmptyOrder;
