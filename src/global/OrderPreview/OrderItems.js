import React from "react";
import styled from "styled-components";
import SingleOrderItem from "./SingleOrderItem";

const calcTotal = x => {
  return x
    .reduce((a, b) => {
      return a + b;
    })
    .toFixed(2);
};

const OrderItems = props => {
  const { order } = props;

  const orderArray = Object.values(order).map(item => {
    return <SingleOrderItem item={item} key={item.id} />;
  });

  const totalCostArray = Object.values(order).map(i => {
    return parseFloat((i.qty * parseFloat(i.price).toFixed(2)).toFixed(2));
  });

  return (
    <OrderItemsWrapper>
      <header>
        <h6>Order</h6>
        <h6>Cost</h6>
      </header>
      <main>{orderArray}</main>
      <footer>
        <h6>Total Cost</h6>
        <h6>${calcTotal(totalCostArray)}</h6>
      </footer>
    </OrderItemsWrapper>
  );
};

const OrderItemsWrapper = styled.section`
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

export default OrderItems;
