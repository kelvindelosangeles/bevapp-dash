import React from "react";
import styled from "styled-components";

const SingleOrderItem = ({ item }) => {
  const { qty, description, price } = item;

  const calcTotal = (qty, price) => {
    // console.log(qty);
    // console.log(parseFloat(price).toFixed(2));
    // console.log(qty * parseFloat(price).toFixed(2));

    return (qty * parseFloat(price).toFixed(2)).toFixed(2);
  };

  return (
    <Order>
      <div className="quantity">{qty}</div>
      <span>x</span>
      <p className="itemTitle">{description}</p>
      <p className="cost">${calcTotal(qty, price)}</p>
    </Order>
  );
};

const Order = styled.div`
  display: flex;
  align-items: baseline;
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
  .itemTitle {
    font-family: "AvenirNext-Regular", "Avenir Next", serif;
    font-size: 14px;
    max-width: 150px;
  }
  .cost {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 14px;
    margin-left: auto;
  }
`;

export default SingleOrderItem;
