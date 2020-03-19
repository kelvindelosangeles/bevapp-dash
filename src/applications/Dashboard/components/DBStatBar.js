import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import { Order as OrdersModel } from "../../../Models/Order";

const DBStatBar = ({ orders }) => {
  const newOrdersCount = orders.filter(i => {
    return i.details.new;
  }).length;

  return (
    <DBStatBarWrapper>
      <Stat color={Colors.blue}>
        <h6>New Orders</h6>
        <p>{newOrdersCount}</p>
      </Stat>
      <Stat color={Colors.green}>
        <h6>Daily Revenue</h6>
        <p>
          {Object.values(orders).length > 0 &&
            OrdersModel.CalculateRevenue(orders)}
        </p>
      </Stat>
    </DBStatBarWrapper>
  );
};

const DBStatBarWrapper = styled.div`
  grid-area: statbar;
  height: 129px;
  display: flex;
  margin: 24px;
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
    font-family: "AvenirNext-Bold";
    color: ${Colors.black};
    font-size: 16px;
    margin-bottom: 8px;
  }
  p {
    font-family: "AvenirNext-Bold";
    color: ${props => {
      return props.color;
    }};
    font-size: 30px;
  }
`;

export default connect(state => {
  return { orders: state.Firestore.ordered.orders };
})(DBStatBar);
