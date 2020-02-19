import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ROControls from "./Components/ROControls";
import ROItems from "./Components/ROItems";
import ROPreview from "./Components/ROPreview";

import AddToCart from "./Components/AddToCart";
import EmptyOrder from "../../Global/Empty Order/EmptyOrder";
import AddtoCartFlavors from "./Components/AddtoCartFlavors";

const RapidOrder = ({ atcVisible, atcfVisible, newOrder }) => {
  const search = useState("");
  const RapidEntry = useState("");
  const OrderEmpty = Object.values(newOrder).length < 1;
  const OrderPreview = OrderEmpty ? (
    <EmptyOrder message="Add an item to create a new order" />
  ) : (
    <ROPreview />
  );

  return (
    <RapidOrderWrapper>
      <ROControls search={search} RapidEntry={RapidEntry} />
      <ROItems filter={search[0]} />
      {OrderPreview}
      {atcVisible && <AddToCart clearSearch={search[1]} />}
      {atcfVisible && <AddtoCartFlavors clearSearch={search[1]} />}
    </RapidOrderWrapper>
  );
};

const RapidOrderWrapper = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 390px;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "rocontrols rorder"
    "roitems rorder";
`;

export default connect(state => {
  return {
    atcVisible: state.RapidOrderState.atcVisible,
    atcfVisible: state.RapidOrderState.atcfVisible,
    newOrder: state.RapidOrderState.newOrder
  };
})(RapidOrder);
