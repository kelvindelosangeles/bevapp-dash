import React, { useMemo } from "react";
import styled from "styled-components";
import CustomerDetails from "../../Global/OrderPreview/CustomerDetails";
import OrderDetails from "../../Global/OrderPreview/OrderDetails";
import uuid from "uuid";

import moment from "moment";
import { withRouter } from "react-router-dom";
import { Colors } from "../../Constants/Colors";
import { connect } from "react-redux";

const NewOrder = ({ customer, cart }) => {
  const orderID = useMemo(() => {
    return (
      moment(new Date()).format("YYMMDD") +
      uuid().slice(0, 8) +
      "ga"
    ).toUpperCase();
  }, []);
  const createdAt = useMemo(() => {
    return moment(new Date()).format("MMM DD, h:mm");
  });

  const CartArray = Object.values(cart).map(i => {
    return (
      <React.Fragment>
        <p>{i.qty}</p>
        <p>{i.description}</p>
        <p>{i.price}</p>
        <p>{i.price}</p>
        <p>Coming Soon</p>
      </React.Fragment>
    );
  });

  return (
    <NewOrderWrapper>
      <NewOrderDetails>
        <CustomerDetails
          name={customer.name}
          address={customer.address}
          telephone={customer.telephone}
        />
        <OrderDetails
          orderID={orderID}
          createdAt={createdAt}
          status={"New Order"}
        />
        <section>Notes</section>
      </NewOrderDetails>
      <h4>Cart</h4>
      <CartGrid>
        <p>Quantity</p>
        <p>Description</p>
        <p>Cost</p>
        <p>Price</p>
        <p>Total</p>
        {CartArray}
      </CartGrid>
    </NewOrderWrapper>
  );
};

const NewOrderWrapper = styled.div`
  padding: 32px 0;
`;

const NewOrderDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 56px;
  section {
    padding: 32px;
    border-bottom: 1px solid ${Colors.lightGrey};
  }
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, max-content);
  grid-column-gap: 40px;
  padding: 0 32px;
`;

export default connect(state => {
  return {
    cart: state.RapidOrderState.cart
  };
})(NewOrder);
