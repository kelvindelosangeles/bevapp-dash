import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ROControls from "./Components/ROControls";
import ROItems from "./Components/ROItems";
import ROrder from "./Components/ROrder";

import AddToCart from "./Components/AddToCart";
import EmptyOrder from "./Components/EmptyOrder";

const RapidOrder = ({ atcVisible, order }) => {
  const search = useState("");
  const RapidEntry = useState("");
  const OrderEmpty = Object.values(order).length < 1;

  return (
    <RapidOrderWrapper>
      <ROControls search={search} RapidEntry={RapidEntry} />
      <ROItems filter={search[0]} />
      {OrderEmpty ? <EmptyOrder /> : <ROrder />}
      {atcVisible && <AddToCart clearSearch={search[1]} />}
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
    order: state.RapidOrderState.order
  };
})(RapidOrder);
