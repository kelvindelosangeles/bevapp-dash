import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Colors } from "../../../constants/Colors";
import Xicon from "@material-ui/icons/Close";

const AddToCart = ({ dispatch, orderItem, clearSearch }) => {
  const [qty, setQty] = useState("");
  const node = useRef();
  const inputNode = useRef();

  const { id, description, price } = orderItem;

  const qtyChangeHandler = e => {
    qty.length > 2 ? setQty(qty.slice(0, 2)) : setQty(e.target.value);
  };
  const submitHandler = e => {
    e.preventDefault();
    clearSearch("");
    dispatch({
      type: "ADD_TO_CART",
      item: { ...orderItem, qty: qty === "" ? 1 : parseInt(qty) }
    });
  };
  const cancelHandler = () => {
    setQty("");
    dispatch({ type: "CLOSE_ATC" });
  };
  const checkForClickOutside = e => {
    !node.current.contains(e.target) && cancelHandler();
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkForClickOutside);

    return () => {
      document.removeEventListener("mousedown", checkForClickOutside);
    };
  });
  useEffect(() => {
    inputNode.current.focus();
  }, []);

  return (
    <AddToCartWrapper>
      <main ref={node}>
        <section id="product-details">
          <div id="logo"></div>
          <div id="details">
            <p>{id}</p>
            <p>{description}</p>
            <p>$ {price}</p>
          </div>
        </section>
        <QuantityForm onSubmit={submitHandler}>
          <Xicon />
          <input
            ref={inputNode}
            type="number"
            min="1"
            max="999"
            placeholder="1"
            value={qty}
            onChange={qtyChangeHandler}
          />
          <p>QTY</p>
          <div>
            <button type="submit">Add</button>
            <button onClick={cancelHandler}>Cancel</button>
          </div>
        </QuantityForm>
      </main>
    </AddToCartWrapper>
  );
};

const AddToCartWrapper = styled.div`
  grid-area: roitems;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  backdrop-filter: blur(2px);
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 32px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 2px 5px 0px rgba(176, 176, 176, 0.25);
  }
  #product-details {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 80px;
    p {
      margin: 8px 0;
      font-family: AvenirNext-Bold;
      font-size: 18px;
      max-width: 200px;

      svg {
        margin-right: 8px;
      }
    }
  }
  #logo {
    border-radius: 50%;
    height: 110px;
    width: 110px;
    margin-right: 40px;
    background-color: salmon;
  }
`;

const QuantityForm = styled.form`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-areas:
    "X QTY"
    ". label"
    "actions actions";
  svg {
    grid-area: X;
    font-size: 48px;
    /* margin-right: 16px; */
    align-self: center;
    justify-self: right;
  }
  input {
    ::placeholder {
      color: ${Colors.black};
    }
  }
  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button,
  input {
    grid-area: QTY;
    height: 100px;
    font-size: 91px;
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    text-align: center;
    border: none;
    -webkit-appearance: none;
    margin: 0;
    color: transparent;
    text-shadow: 0 0 0 ${Colors.black};
    :focus {
      outline: none;
    }
  }
  p {
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    font-size: 16px;
    grid-area: label;
    text-align: center;
    padding-top: 8px;
    padding-bottom: 80px;
  }
  div {
    grid-area: actions;
    display: flex;
    justify-content: space-between;
    button {
      width: 153px;
      height: 54px;
      font-family: "AvenirNext-Bold", "Avenir Next", serif;
      color: ${Colors.white};
      background-color: ${Colors.black};
      border-radius: 8px;
      font-size: 19px;
      cursor: pointer;
      :nth-of-type(2) {
        margin-left: 16px;
        background-color: ${Colors.white};
        color: ${Colors.black};
        border: 3px solid ${Colors.black};
      }
    }
  }
`;

export default connect(state => {
  return { orderItem: state.RapidOrderState.orderItem };
})(AddToCart);
