import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Colors } from "../../../../Constants/Colors";

const Order = ({ order, dispatch, activeOrder }) => {
  const total = Object.values(order.cart)
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
      order: order
    });
  };
  const clearHandler = () => {
    dispatch({
      type: "CLEAR_ORDER"
    });
  };

  const activeOrderID = activeOrder ? activeOrder.details.orderID : null;

  const OrderIsActive = activeOrderID == order.details.orderID;

  return (
    <OrderWrapper active={OrderIsActive}>
      <div>
        <h6>{order.details.orderID.slice(6)}</h6>
        <p>{order.details.createdAt}</p>
      </div>
      <h6>{order.customer.name}</h6>
      <h6>$ {total} </h6>
      {OrderIsActive ? (
        <Close onClick={clearHandler}>Close</Close>
      ) : (
        <button onClick={viewHandler}>View</button>
      )}
    </OrderWrapper>
  );
};

const OrderWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 2fr 1fr 2fr;
  grid-template-rows: 1fr;
  grid-gap: 48px;
  padding: 24px;
  border-bottom: 1px solid ${Colors.lightGrey};
  background-color: ${props => {
    return props.active && Colors.lightGrey;
  }};
  :last-of-type {
    border-bottom: none;
  }
  :hover {
    background-color: ${Colors.lightGrey};
    transition: all ease-in-out;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  h6 {
    font-family: "AvenirNext-DemiBold";
    color: "#000000";
    font-size: 14px;

    text-transform: capitalize;
  }
  p {
    font-family: "AvenirNext-Medium";
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
    font-family: "AvenirNext-Medium";
    font-size: 14px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
`;

const Close = styled.button`
  margin-left: auto;
  width: 112px;
  min-width: 112px;
  height: 40px;
  background-color: ${Colors.red}!important;
  color: ${Colors.white};
  font-family: "AvenirNext-Medium";
  font-size: 14px;
  border-radius: 4px;
  border: none;
`;

export default connect(state => {
  return {
    activeOrder: state.DashboardState.activeOrder
  };
})(Order);
