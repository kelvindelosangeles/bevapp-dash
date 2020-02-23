import React from "react";
import styled from "styled-components";
import TrashIcon from "@material-ui/icons/Delete";
import { Colors } from "../../Constants/Colors";
import { connect } from "react-redux";

const CartItem = ({ item, dispatch, readOnly }) => {
  const { qty, description, price } = item;
  const calcTotal = (qty, price) => {
    return (qty * parseFloat(price).toFixed(2)).toFixed(2);
  };
  const removeItem = () => {
    console.log(item);
    window.confirm(`Remove ${item.description}?`) &&
      dispatch({ type: "REMOVE_ITEM", id: item.id });
  };
  const ToggleModal = () => {
    return readOnly
      ? null
      : item.hasOwnProperty("flavors")
      ? dispatch({ type: "TOGGLE_ATCF", item })
      : dispatch({ type: "TOGGLE_ATC", item });
  };
  const flavors =
    item.hasOwnProperty("flavorsQuantity") &&
    Object.entries(item.flavorsQuantity)
      .filter(i => {
        return Number(i[1] > 0);
      })
      .map(i => {
        return (
          <Flavor>
            <p>{i[1]}</p>
            <span>x</span>
            <p>{i[0]}</p>
          </Flavor>
        );
      });

  return (
    <React.Fragment>
      <Order readOnly={readOnly}>
        <div className="quantity" onClick={ToggleModal}>
          {qty}
        </div>
        <span>x</span>
        <p className="itemTitle">{description}</p>
        <p className="cost">
          $ {calcTotal(qty, price)}{" "}
          {readOnly ? null : <TrashIcon onClick={removeItem} />}
        </p>
      </Order>
      {flavors}
    </React.Fragment>
  );
};

const Order = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 16px;
  .quantity {
    width: 26px;
    font-family: "AvenirNext-Bold";
    font-size: 14px;
    text-align: right;
    margin-right: 8px;
    cursor: ${props => {
      return props.readOnly ? "default" : "pointer";
    }};
       :hover {
      color: ${props => {
        return props.readOnly ? Colors.black : Colors.blue;
      }};
      transform: ${props => {
        return props.readOnly ? "scale(1)" : "scale(1.2)";
      }};
    }
  }
  span {
    font-family: "AvenirNext-Medium";
    font-size: 11px;
    letter-spacing: 0;
    line-height: 0.4;
    margin-right: 16px;
  }
  .itemTitle {
    font-family: "AvenirNext-Medium";
    font-size: 14px;
    max-width: 150px;
    /* letter-spacing: 0.5px; */
    text-transform: uppercase;
  }
  .cost {
    font-family: "AvenirNext-Bold";
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

const Flavor = styled.div`
  display: flex;
  align-items: center;
  padding-left: 80px;
  margin-bottom: 8px;
  p,
  span {
    font-family: AvenirNext-Bold;
    font-size: 12px;
    margin-right: 8px;
    :last-child {
      text-transform: uppercase;
    }
  }
`;

export default connect()(CartItem);
