import React, { useState } from "react";
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
  const [editedOrder, toggleEditedOrder] = useState(false);

  const orderArray = Object.values(order).map(item => {
    return <CartItem item={item} key={item.id} readOnly={readOnly} />;
  });

  const totalCostArray = Object.values(order).map(i => {
    return parseFloat((i.qty * parseFloat(i.price).toFixed(2)).toFixed(2));
  });

  return (
    <OrderCartWrapper>
      <EditedOrderToggle editedOrder={editedOrder}>
        <button
          onClick={() => {
            toggleEditedOrder(false);
          }}
        >
          Original
        </button>
        <button
          onClick={() => {
            toggleEditedOrder(true);
          }}
        >
          Edited
        </button>
      </EditedOrderToggle>
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

const EditedOrderToggle = styled.section`
  display: flex;
  justify-content: space-evenly;
  button {
    width: 40%;
    padding: 18px 0;
    border: none;
    font-family: Gilroy-ExtraBold;
    font-size: 16px;

    cursor: pointer;
    :first-of-type {
      border-bottom: 4px solid
        ${props => {
          return props.editedOrder ? "white" : "black";
        }};
    }
    :last-of-type {
      border-bottom: 4px solid
        ${props => {
          return props.editedOrder ? "black" : "white";
        }};
    }
  }
`;

export default OrderCart;
