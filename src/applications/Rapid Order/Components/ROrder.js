import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Colors } from "../../../constants/Colors";
import SingleOrderItem from "./SingleOrderItem";

const calcTotal = totalsArray => {
  return totalsArray
    .reduce((a, b) => {
      return a + b;
    })
    .toFixed(2);
};

const ROrder = ({ order }) => {
  const orderList = Object.values(order).map(item => {
    return <SingleOrderItem item={item} key={item.id} />;
  });

  const totalCostArray = Object.values(order).map(i => {
    return parseFloat((i.qty * parseFloat(i.price).toFixed(2)).toFixed(2));
  });

  return (
    <ROrderWrapper>
      <div className="wrapper">
        <CustomerDetails>
          <div>
            <h3>106 Columbus</h3>
            <p>945 Amsterdam Ave</p>
            <p>917-543-8677</p>
            <p>NYC</p>
          </div>
          <div> Map Image</div>
        </CustomerDetails>
        <OrderDetails>
          <div className="row">
            <div className="detail">
              <h6>Order ID</h6>
              <p>XSKFNEWI392S</p>
            </div>
            <div className="detail">
              <h6>Placed By</h6>
              <p>Kelvin De Los Angeles</p>
            </div>
          </div>
          <div className="row">
            <div className="detail">
              <h6>Ordered On</h6>
              <p>Jan 14, 16:52</p>
            </div>
            <div className="detail">
              <h6>Status/Complete</h6>
              <p>Pending Review</p>
            </div>
          </div>
        </OrderDetails>
        <OrderItems>
          <header>
            <h6>Order</h6>
            <h6>Cost</h6>
          </header>
          <main>{orderList}</main>
          <footer>
            <h6>Total Cost</h6>
            {/* TODO: Refactor, when there is no order this component will not be
            shown */}
            <h6>${totalCostArray.length > 0 && calcTotal(totalCostArray)}</h6>
          </footer>
        </OrderItems>
        <OrderActions>
          <button className="complete">Complete Order</button>
        </OrderActions>
      </div>
    </ROrderWrapper>
  );
};

const ROrderWrapper = styled.div`
  position: relative;
  grid-area: rorder;
  height: 100%;
  background-color: ${Colors.white};
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

const CustomerDetails = styled.section`
  display: flex;
  justify-content: space-between;
  h3 {
    font-family: "AvenirNext-Heavy", "Avenir Next", serif;
    font-size: 18px;
    margin-bottom: 8px;
  }
  p {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 14px;
  }
`;

const OrderDetails = styled.section`
  .row {
    display: flex;
    :first-of-type {
      margin-bottom: 24px;
    }
  }
  .detail {
    flex: 1;
  }
  h6 {
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    font-size: 14px;
  }
  p {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 12px;
  }
`;

const OrderItems = styled.section`
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  h6 {
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    font-size: 16px;
  }
  main {
    margin-bottom: 40px;
  }
  footer {
    display: flex;
    justify-content: space-between;
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
export default connect(state => {
  return { order: state.RapidOrderState.order };
})(ROrder);
