import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import { connect } from "react-redux";
import DBPreview from "../Components/DBPreview";
import EmptyOrder from "../../../Global/Empty Order/EmptyOrder";
import Orders from "../Components/Orders/Orders";

const CompletedOrders = ({ activeOrder, dispatch }) => {
  const [search, setSerach] = useState("");

  useEffect(() => {
    // Check if the activeorder is new else clear it
    activeOrder &&
      !activeOrder.details.complete &&
      dispatch({
        type: "CLEAR_ACTIVE_ORDER"
      });
  }, []);

  const onChangeHandler = e => {
    setSerach(e.target.value.toUpperCase());
  };

  const OrderPreview = activeOrder ? (
    <DBPreview activeOrder={activeOrder} />
  ) : (
    <EmptyOrder message="Select an order to view it's details" />
  );

  return (
    <CompletedOrdersGrid>
      <Heading>Completed Orders</Heading>
      <Filters>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={onChangeHandler}
        />
      </Filters>
      <Orders complete search={search} />
      {OrderPreview}
    </CompletedOrdersGrid>
  );
};

const CompletedOrdersGrid = styled.div`
  grid-area: app;
  display: grid;
  grid-template-columns: 1fr 390px;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    "A preview"
    "C preview"
    "orders preview";
  align-content: flex-start;
`;
const Heading = styled.h3`
  grid-area: A;
  font-family: Poppins;
  font-weight: 500;
  font-size: 24px;
  padding-left: 32px;
  margin-bottom: 24px;
`;
const Filters = styled.div`
  grid-area: C;
  input {
    background-color: ${Colors.lightGrey};
    padding: 16px;
    margin: 0 32px;
    border-radius: 8px;
    outline: none;
    border: none;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 500;
    width: -webkit-fill-available;
  }
`;

export default connect(state => {
  return {
    activeOrder: state.DashboardState.activeOrder
  };
})(CompletedOrders);
