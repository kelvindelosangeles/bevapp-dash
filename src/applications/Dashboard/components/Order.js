import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import moment from "moment";

const Order = () => {
  const date = new Date();
  console.log(date);
  return (
    <OrderWrapper>
      <div>
        <h6>XUWKEOSME38SN</h6>
        <p>Jan 14, 16:42</p>
      </div>

      <h6>945 Amsterdam Ave</h6>
      <h6>$1342.59</h6>
      <button>View</button>
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
    margin-right: 24px;
  }
  p {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    color: ${Colors.grey};
    font-size: 11px;
  }
  button {
    margin-left: auto;
    width: 112px;
    height: 40px;
    background-color: ${Colors.blue};
    color: ${Colors.white};
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 14px;
    border-radius: 4px;
    border: none;
  }
`;

export default Order;
