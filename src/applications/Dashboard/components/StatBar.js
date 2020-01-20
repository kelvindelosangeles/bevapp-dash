import React from "react";

import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

const StatBar = () => {
  return (
    <StatBarWrapper>
      <Stat color={Colors.blue}>
        <h6>New Orders</h6>
        <p>32</p>
      </Stat>
      <Stat color={Colors.green}>
        <h6>Total Revenue</h6>
        <p>$1346.00</p>
      </Stat>
    </StatBarWrapper>
  );
};

const StatBarWrapper = styled.div`
  height: 129px;
  display: flex;
  margin-bottom: 32px;
`;
const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: ${Colors.white};
  justify-content: space-between;
  padding: 32px 16px;
  border-radius: 8px;
  margin-right: 24px;
  h6 {
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    color: ${Colors.black};
    font-size: 16px;
    margin-bottom: 8px;
  }
  p {
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    color: ${props => {
      return props.color;
    }};
    font-size: 30px;
  }
`;

export default StatBar;
