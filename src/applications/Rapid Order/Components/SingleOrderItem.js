import React from "react";
import styled from "styled-components";
import TrashIcon from "@material-ui/icons/Delete";
import { Colors } from "../../../constants/Colors";
import { connect } from "react-redux";

const SingleOrderItem = ({ item, dispatch }) => {
  const { qty, description, price } = item;

  const calcTotal = (qty, price) => {
    return (qty * parseFloat(price).toFixed(2)).toFixed(2);
  };

  const removeItem = () => {
    window.confirm(`Remove ${item.description}?`) &&
      dispatch({ type: "REMOVE_ITEM", id: item.id });
  };

  const ToggleATC = () => {
    dispatch({ type: "TOGGLE_ATC", item });
  };

  return (
    <Order>
      <div className="quantity" onClick={ToggleATC}>
        {qty}
      </div>
      <span>x</span>
      <p className="itemTitle">{description}</p>
      <p className="cost">
        ${calcTotal(qty, price)} <TrashIcon onClick={removeItem} />
      </p>
    </Order>
  );
};

const Order = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 16px;
  .quantity {
    width: 26px;
    font-family: "AvenirNext-DemiBold", "Avenir Next", serif;
    font-size: 14px;
    text-align: right;
    margin-right: 8px;
    cursor: pointer;
    :hover {
      color: ${Colors.blue};
      transform: scale(1.2);
    }
  }
  span {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 11px;
    letter-spacing: 0;
    line-height: 0.4;
    margin-right: 16px;
  }
  .itemTitle {
    font-family: "AvenirNext-Demibold", "Avenir Next", serif;
    font-size: 14px;
    max-width: 150px;
    letter-spacing: 0.5px;
    text-transform: capitalize;
  }
  .cost {
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 14px;
    margin-left: auto;
    display: flex;
    align-items: center;
    svg {
      margin-left: 12px;
      color: ${Colors.black};
      font-size: 20px;
      cursor: pointer;
      :hover {
        color: ${Colors.red};
      }
    }
  }
`;

export default connect()(SingleOrderItem);
