import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Order as OrdersModel } from "../../../Models/Order";
import { Colors } from "../../../Constants/Colors";

const DBStatBar = ({ orders }) => {
  const newOrdersCount = Object.values(orders).filter(i => {
    // because were using the ordered dataset and it inlcudes an id
    return i.details && i.details.complete === false;
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
            "$ " + OrdersModel.CalculateRevenue(orders)}
        </p>
      </Stat>
      <Completed to="/dashboard/completedorders">Completed Orders</Completed>
    </DBStatBarWrapper>
  );
};

const DBStatBarWrapper = styled.div`
  grid-area: statbar;
  display: flex;
  align-items: center;
  height: 129px;
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
    white-space: nowrap;
  }
  p {
    font-family: "AvenirNext-Bold";
    color: ${props => {
      return props.color;
    }};
    font-size: 30px;
  }
`;

const Completed = styled(Link)`
  height: 50%;
  width: 40%;
  background-color: darkslategray;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.white};
  font-family: Poppins-Medium;
  font-size: 20px;
  margin-left: auto;
  text-decoration: none;
`;

export default connect(state => {
  return { orders: state.Firestore.ordered.orders[0] };
})(DBStatBar);
