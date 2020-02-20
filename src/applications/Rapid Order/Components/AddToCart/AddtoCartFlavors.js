import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Colors } from "../../../../Constants/Colors";
import ItemDetails from "./ItemDetails";
import FlavorsInput from "./FlavorsInput";

const AddtoCartFlavors = ({ orderItem, dispatch }) => {
  const [flavorsQuantity, setFlavorsQuantity] = useState({});
  const node = useRef();

  useEffect(() => {
    const flavors = orderItem.flavors.reduce((o, key) => {
      return Object.assign(o, { [key]: "" });
    }, {});
    setFlavorsQuantity({ ...flavors });
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", checkForClickOutside);

    return () => {
      document.removeEventListener("mousedown", checkForClickOutside);
    };
  });

  const checkForClickOutside = e => {
    !node.current.contains(e.target) && cancelHandler();
  };

  const FlavorChangeHandler = e => {
    const value = e.target.value;
    const name = e.target.name;

    value.length > 2
      ? setFlavorsQuantity(prevState => {
          return { ...prevState, [name]: value.slice(0, 3) };
        })
      : setFlavorsQuantity(prevState => {
          return { ...prevState, [name]: value };
        });
  };

  const submitHandler = e => {
    e.preventDefault();

    const total = Object.values(flavorsQuantity)
      .map(i => {
        return Number(i);
      })
      .reduce((a, b) => {
        return a + b;
      });

    total < 1
      ? cancelHandler()
      : dispatch({
          type: "ADD_TO_CART",
          item: {
            ...orderItem,
            qty: total,
            flavorsQuantity
          }
        });
  };

  const cancelHandler = () => {
    setFlavorsQuantity({});
    dispatch({ type: "CLOSE_ATC" });
  };

  const Flavors = orderItem.flavors.sort().map(i => {
    return (
      <FlavorsInput
        key={i}
        name={i}
        FlavorChangeHandler={FlavorChangeHandler}
        flavorsQuantity={flavorsQuantity}
      />
    );
  });

  return (
    <Overlay>
      <Modal ref={node}>
        <ItemDetails orderItem={orderItem} />
        <FlavorsForm onSubmit={submitHandler}>
          {Flavors}
          <FlavorsFormActions>
            <button type="submit">Add</button>
            <button onClick={cancelHandler}>Cancel</button>
          </FlavorsFormActions>
        </FlavorsForm>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  grid-area: roitems;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  backdrop-filter: blur(2px);
`;

const Modal = styled.div`
  padding: 40px 32px;
  background-color: ${Colors.white};
  border-radius: 8px;
`;
const FlavorsForm = styled.form``;

const FlavorsFormActions = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: center;
  button {
    width: 160px;
    height: 50px;
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    color: ${Colors.white};
    background-color: ${Colors.black};
    border-radius: 8px;
    font-size: 15px;
    cursor: pointer;
    :nth-of-type(2) {
      margin-left: 16px;
      background-color: ${Colors.white};
      color: ${Colors.black};
      border: 3px solid ${Colors.black};
    }
  }
`;

export default connect(state => {
  return { orderItem: state.RapidOrderState.orderItem };
})(AddtoCartFlavors);
