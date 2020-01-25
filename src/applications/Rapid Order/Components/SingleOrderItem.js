import React from "react";
import styled from "styled-components";

const SingleOrderItem = () => {
  return (
    <Order>
      <div className="quantity">50</div>
      <span>x</span>
      <p className="itemTitle">Pepsi 12 oz Can</p>
      <p className="cost">$ 47.32</p>
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
