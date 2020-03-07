import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ROControls from "./Components/ROControls";
import ROItems from "./Components/ROItems";
import ROPreview from "./Components/ROPreview";

import EmptyOrder from "../../Global/Empty Order/EmptyOrder";
import AddtoCartFlavors from "./Components/AddToCart/AddtoCartFlavors";
import AddToCart from "./Components/AddToCart/AddToCart";

const RapidOrder = ({ atcVisible, atcfVisible, cart, sidebarExpanded }) => {
  const search = useState("");
  const RapidEntry = useState("");
  const SmartEntryQty = useState("");
  const SmartEntryID = useState("");

  const OrderEmpty = Object.values(cart).length < 1;
  const OrderPreview = OrderEmpty ? (
    <EmptyOrder message="Add an item to create a new order" />
  ) : (
    <ROPreview />
  );

  return (
    <RapidOrderWrapper expand={sidebarExpanded}>
      <ROControls
        search={search}
        RapidEntry={RapidEntry}
        SmartEntryQty={SmartEntryQty}
        SmartEntryID={SmartEntryID}
      />
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
  grid-template-columns: ${({ expand }) =>
    expand ? "1fr 390px" : "1fr 500px"};
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "preview rocontrols"
    "preview roitems";
`;

export default connect(state => {
  return {
    atcVisible: state.RapidOrderState.atcVisible,
    atcfVisible: state.RapidOrderState.atcfVisible,
    cart: state.RapidOrderState.cart,
    sidebarExpanded: state.GlobalState.sidebarExpanded
  };
})(RapidOrder);
