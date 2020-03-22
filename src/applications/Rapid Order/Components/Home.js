import React from "react";
import styled from "styled-components";
import CartIcon from "@material-ui/icons/ShoppingBasketRounded";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import CustomerSelect from "../../../Global/CustomerSelect/CustomerSelect";

const Home = ({ dispatch, customer }) => {
  const customerChangeHandler = (e, value) => {
    return dispatch({
      type: "SET_CUSTOMER",
      customer: value
    });
  };

  return (
    <HomeWrapper>
      <StyledCartIcon />
      <Title>Select a Customer to Create a New Order</Title>
      <CustomerSelect
        customerChangeHandler={customerChangeHandler}
        selectedCustomer={customer}
      />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: start;
  padding: 200px 0 32px 0;
`;
const StyledCartIcon = styled(CartIcon)`
  justify-self: center;
  font-size: 95px !important;
  margin-bottom: 24px;
`;
const Title = styled.p`
  font-family: Poppins;
  font-weight: 900;
  font-size: 32px;
  text-align: center;
  max-width: 494px;
  margin-bottom: 32px;
`;

export default connect(state => {
  return {
    customer: state.RapidOrderState.customer
  };
})(withRouter(Home));
