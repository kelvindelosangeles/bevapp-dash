import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import Item from "./Item";

const ROItems = ({ filter, store }) => {
  const filterIsEmpty = filter === "";

  const popularItems = Object.values(store)
    .filter((x, index) => {
      return index < 12;
    })
    .map(i => {
      return <Item item={i} key={i.id} />;
    });
  let filterdItems = Object.values(store)
    .filter(x => {
      return (
        x.description.toLowerCase().includes(filter.toLowerCase()) ||
        x.id.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .map(i => {
      return <Item item={i} key={i.id} />;
    });
  if (filter !== "" && filterdItems.length < 1) {
    filterdItems = <NoMatch>No Match Found</NoMatch>;
  }

  return (
    <ROItemsWrapper>
      {filterIsEmpty ? popularItems : filterdItems}
    </ROItemsWrapper>
  );
};

const ROItemsWrapper = styled.div`
  position: relative;
  grid-area: roitems;
  justify-self: center;
  width: 616px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-content: start;
  grid-gap: 32px;
  overflow: scroll;
`;

const NoMatch = styled.p`
  grid-column: 1/5;
  text-align: center;
  padding: 80px 0;
`;

export default connect(state => {
  return {
    store: state.Firestore.data.inventory.beverages
  };
})(ROItems);
