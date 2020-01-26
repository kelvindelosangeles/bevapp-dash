import React from "react";
import styled from "styled-components";
import { Colors } from "../../../constants/Colors";
import { connect } from "react-redux";

const Item = ({ item, dispatch }) => {
  const { description, price } = item;

  const ToggleATC = () => {
    dispatch({ type: "TOGGLE_ATC", item });
  };

  return (
    <ItemWrapper onClick={ToggleATC}>
      <div></div>
      <h5>{description}</h5>
      {/* <p>${price}</p> */}
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  background-color: ${Colors.white};
  height: 130px;
  padding: 0 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 5px 0px rgba(179, 179, 179, 0.25);
  cursor: pointer;
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
    text-align: center;
    margin-bottom: 4px;
  }
  p {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 12px;
  }
`;

export default connect()(Item);
