import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";

const calcTotal = x => {
  return x
    .reduce((a, b) => {
      return a + b;
    })
    .toFixed(2);
};

const OrderCart = ({ order, readOnly = false }) => {
  console.log(order);

  const orderArray = Object.values(order).map(item => {
    return <CartItem item={item} key={item.id} readOnly={readOnly} />;
  });

  const totalCostArray = Object.values(order).map(i => {
    return parseFloat((i.qty * parseFloat(i.price).toFixed(2)).toFixed(2));
  });

  return (
    <OrderCartWrapper>
      <header>
        <h6>Order</h6>
        <h6>Cost</h6>
      </header>
      <main>{orderArray}</main>
      <footer>
        <h6>Total Cost</h6>
        <h6>${calcTotal(totalCostArray)}</h6>
      </footer>
    </OrderCartWrapper>
  );
};

const OrderCartWrapper = styled.section`
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

export default OrderCart;
