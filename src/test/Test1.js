import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Test1 = props => {
  const list = Object.values(props.store).map(i => {
    return (
      <Item>
        <p>{i.id}</p>
        <p>$ {i.price}</p>
        <p>{i.description}</p>
        {i.flavors && (
          <div>
            {i.flavors.map(i => {
              return <p>{i}</p>;
            })}
          </div>
        )}
      </Item>
    );
  });

  return <div>{list}</div>;
};

const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 8px;
  padding: 16px;
  :nth-of-type(even) {
    background-color: lightgrey;
  }
`;

export default connect(state => {
  return {
    store: state.Firestore.data.inventory.beverages
  };
})(Test1);
