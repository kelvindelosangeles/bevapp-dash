import React from "react";
import styled from "styled-components";

const SingleOrderItem = ({ orderDetails }) => {
  return (
    <Order>
      <div className="quantity">{orderDetails.qty}</div>
      <span>x</span>
      <div className="logo" />
      <p className="itemTitle">{orderDetails.description}</p>
      <p className="cost">$ {orderDetails.price}</p>
    </Order>
  );
};

const Order = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .quantity {
    width: 26px;
    font-family: "AvenirNext-DemiBold", "Avenir Next", serif;
    font-size: 14px;
    text-align: right;
    margin-right: 8px;
  }
  span {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 11px;
    letter-spacing: 0;
    line-height: 0.4;
    margin-right: 24px;
  }
  .logo {
    height: 24px;
    width: 24px;
    background-color: grey;
    border-radius: 50%;
    margin-right: 16px;
  }
  .itemTitle {
    font-family: "AvenirNext-Regular", "Avenir Next", serif;
    font-size: 14px;
  }
  .cost {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 14px;
    margin-left: auto;
  }
`;

export default SingleOrderItem;
