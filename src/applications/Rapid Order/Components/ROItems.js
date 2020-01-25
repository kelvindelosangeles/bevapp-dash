import React from "react";
import styled from "styled-components";
import Item from "./Item";

const ROItems = () => {
  return (
    <ROItemsWrapper>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </ROItemsWrapper>
  );
};

const ROItemsWrapper = styled.div`
  grid-area: roitems;
  justify-self: center;
  width: 616px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-content: start;
  grid-gap: 32px;
  overflow: scroll;
`;

export default ROItems;
