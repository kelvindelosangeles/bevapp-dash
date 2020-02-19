import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Colors } from "../../../../Constants/Colors";

const Order = ({ newOrder, dispatch, activeOrder }) => {
  const total = Object.values(newOrder.cart)
    .map(i => {
      const total = parseFloat(i.qty * parseFloat(i.price));
      return total;
    })
    .reduce((a, b) => {
      return a + b;
    })
    .toFixed(2);

  const viewHandler = () => {
    console.log(newOrder);
    dispatch({
      type: "SET_ACTIVE_ORDER",
      order: newOrder
    });
  };
  const clearHandler = () => {
    dispatch({
      type: "CLEAR_ORDER"
    });
  };

  const activeOrderID =
    Object.values(activeOrder).length > 0 ? activeOrder.details.orderID : null;

  const OrderIsActive = activeOrderID == newOrder.details.orderID;

  return (
    <OrderWrapper active={OrderIsActive}>
      <div>
        <h6>{newOrder.details.orderID}</h6>
        <p>{newOrder.details.createdAt}</p>
      </div>
      <h6>{newOrder.customer.name}</h6>
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
  grid-template-columns: 2fr 2fr 1fr 2fr;
  grid-template-rows: 1fr;
  grid-gap: 48px;
  padding: 24px;
  border-bottom: 1px solid ${Colors.lightGrey};
  background-color: ${props => {
    return props.active && Colors.lightGrey;
  }};
  :last-of-type {
    padding-bottom: 0;
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
    font-family: "AvenirNext-DemiBold", "Avenir Next", serif;
    color: "#000000";
    font-size: 14px;
    /* width: 180px; */
    /* min-width: 180px; */
    /* margin-right: 24px; */
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
  font-family: "AvenirNext-Medium", "Avenir Next", serif;
  font-size: 14px;
  border-radius: 4px;
  border: none;
`;

export default connect(state => {
  return {
    activeOrder: state.DashboardState.activeOrder
  };
})(Order);
