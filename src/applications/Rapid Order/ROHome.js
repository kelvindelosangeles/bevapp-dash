import React from "react";
import styled from "styled-components";
import CartIcon from "@material-ui/icons/ShoppingBasketRounded";

const ROHome = () => {
  return (
    <ROHomeWrapper>
      <CartIcon />
      <h3>Select a Customer to Create a New Order</h3>
    </ROHomeWrapper>
  );
};

const ROHomeWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: start;

  padding: 200px 0 32px 0;
  h3 {
    font-family: Poppins-ExtraBold;
    font-size: 32px;
    text-align: center;
    max-width: 494px;
  }
  svg {
    justify-self: center;
    font-size: 95px;
    margin-bottom: 24px;
  }
`;

export default ROHome;
