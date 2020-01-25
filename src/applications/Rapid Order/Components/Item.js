import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";

const Item = () => {
  return (
    <ItemWrapper>
      <div></div>
      <h5>Pepsi 12oz can</h5>
      <p>$12.99</p>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  background-color: ${Colors.white};
  height: 130px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px 0px rgba(179, 179, 179, 0.25);
  div {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: ${Colors.grey};
    margin-bottom: 16px;
  }
  h5 {
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    font-size: 12px;
    margin-bottom: 4px;
  }
  p {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 12px;
  }
`;

export default Item;
