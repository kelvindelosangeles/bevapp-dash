import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { Colors } from "../../../../constants/Colors";
import SingleOrderItem from "./SingleOrderItem";
import CustomerDetails from "../../../../global/OrderPreview/CustomerDetails";
import OrderDetails from "../../../../global/OrderPreview/OrderDetails";
import OrderItems from "../../../../global/OrderPreview/OrderItems";

const SingleOrder = props => {
  const { customer, details, order } = props.order;

  return (
    <SingleOrderWrapper>
      <div className="wrapper">
        <CustomerDetails
          name={customer.name}
          address={customer.address}
          telephone={customer.telephone}
        />

        <OrderDetails
          orderID={details.orderID}
          createdAt={details.createdAt}
          status="Pending Review"
        />

        <OrderItems order={order} />

        <OrderActions>
          <div>
            <SmallButton color={Colors.yellow}>Edit</SmallButton>
            <SmallButton color={Colors.blue}>Print</SmallButton>
            <SmallButton color={Colors.red}>Delete</SmallButton>
          </div>
          <button className="complete">Complete Order</button>
        </OrderActions>
      </div>
    </SingleOrderWrapper>
  );
};

const SingleOrderWrapper = styled.div`
  position: relative;
  flex: 1;
  .wrapper {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: scroll;
  }
  section {
    padding: 32px;
    border-bottom: 1px solid ${Colors.lightGrey};
  }
`;

const OrderActions = styled.section`
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  button {
    height: 40px;
    border-radius: 5px;
    border: none;
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 14px;
  }
  .complete {
    width: 100%;
    background-color: ${Colors.green};
  }
`;
const SmallButton = styled.button`
  width: 80px;
  background-color: ${props => props.color};
`;

export default connect(state => {
  return { order: state.DashboardState.activeOrder };
})(SingleOrder);
