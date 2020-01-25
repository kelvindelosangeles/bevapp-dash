import React from "react";
import styled from "styled-components";
import ROControls from "./Components/ROControls";
import ROItems from "./Components/ROItems";
import ROrder from "./Components/ROrder";

const RapidOrder = () => {
  return (
    <RapidOrderWrapper>
      <ROControls />
      <ROItems />
      <ROrder />
    </RapidOrderWrapper>
  );
};

const RapidOrderWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 360px;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "rocontrols rorder"
    "roitems rorder";
`;

export default RapidOrder;
