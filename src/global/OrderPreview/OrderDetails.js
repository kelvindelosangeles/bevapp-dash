import React from "react";
import styled from "styled-components";

const OrderDetails = ({ orderID, createdAt, status }) => {
  return (
    <OrderDetailsWrapper>
      <div className="row">
        <div className="detail">
          <h6>Order ID</h6>
          <p>{orderID.slice(6)}</p>
        </div>
        <div className="detail">
          <h6>Placed By</h6>
          <p>Administrator Account</p>
        </div>
      </div>
      <div className="row">
        <div className="detail">
          <h6>Ordered On</h6>
          <p>{createdAt}</p>
        </div>
        <div className="detail">
          <h6>Status</h6>
          <p id="status">{status}</p>
        </div>
      </div>
    </OrderDetailsWrapper>
  );
};

const OrderDetailsWrapper = styled.section`
  .row {
    display: flex;
    :first-of-type {
      margin-bottom: 24px;
    }
  }
  .detail {
    flex: 1;
  }
  #status {
    color: #22aa99;
    font-family: "AvenirNext-Bold";
  }
  h6 {
    font-family: "AvenirNext-Bold";
    font-size: 14px;
  }
  p {
    font-family: "AvenirNext-Medium";
    font-size: 12px;
  }
`;

export default OrderDetails;
