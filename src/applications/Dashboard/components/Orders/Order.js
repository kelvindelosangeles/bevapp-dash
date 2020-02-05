import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Colors } from "../../../../constants/Colors";

const Order = ({ orderDetails, dispatch }) => {
  const total = Object.values(orderDetails.order)
    .map(i => {
      const total = parseFloat(i.qty * parseFloat(i.price));
      return total;
    })
    .reduce((a, b) => {
      return a + b;
    })
    .toFixed(2);

  const viewHandler = () => {
    dispatch({
      type: "SET_ACTIVE_ORDER",
      order: orderDetails
    });
  };

  return (
    <OrderWrapper>
      <div>
        <h6>{orderDetails.details.orderID}</h6>
        <p>{orderDetails.details.createdAt}</p>
      </div>
      <h6>{orderDetails.customer.name}</h6>
      <h6>$ {total} </h6>
      <button onClick={viewHandler}>View</button>
    </OrderWrapper>
  );
};

const OrderWrapper = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 32px;
  :last-of-type {
    margin-bottom: 0;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  h6 {
    font-family: "AvenirNext-DemiBold", "Avenir Next", serif;
    color: "#000000";
    font-size: 14px;
    width: 180px;
    min-width: 180px;
    margin-right: 24px;
    text-transform: capitalize;
  }
  p {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    color: ${Colors.grey};
    font-size: 11px;
  }
  button {
    margin-left: auto;
    width: 112px;
    min-width: 112px;
    height: 40px;
    background-color: ${Colors.blue};
    color: ${Colors.white};
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 14px;
    border-radius: 4px;
    border: none;
  }
`;

export default connect()(Order);
