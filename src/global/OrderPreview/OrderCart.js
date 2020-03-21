import React, { useState } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { Order as OrderModel } from "../../Models/Order";

const OrderCart = ({ cart, readOnly = false }) => {
  const cartArray = Object.values(cart).map(item => {
    return <CartItem item={item} key={item.id} readOnly={readOnly} />;
  });

  return (
    <OrderCartWrapper>
      <header>
        <h6>Order</h6>
        <h6>Cost</h6>
      </header>
      <main>{cartArray}</main>
      <footer>
        <h6>Total Cost</h6>
        <h6>${OrderModel.CalculateCart(cart)}</h6>
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
    font-family: Poppins;
    font-weight: 700;
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
