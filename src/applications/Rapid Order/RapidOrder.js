import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import BoltIcon2 from "@material-ui/icons/LinearScaleRounded";

import ROControls from "./Components/ROControls";
import ROItems from "./Components/ROItems";
import ROPreview from "./Components/ROPreview";

import EmptyOrder from "../../Global/Empty Order/EmptyOrder";
import AddtoCartFlavors from "./Components/AddToCart/AddtoCartFlavors";
import AddToCart from "./Components/AddToCart/AddToCart";
import CustomerSelect from "./Components/CustomerSelect";
import { Route, withRouter, Switch } from "react-router-dom";
import ROHome from "./ROHome";
import NewOrder from "./NewOrder";
import { Colors } from "../../Constants/Colors";

const RapidOrder = ({
  atcVisible,
  atcfVisible,
  cart,
  history,
  store,
  dispatch
}) => {
  const [smartEntryID, setSmartEntryID] = useState("");
  const [smartEntryQty, setSmartEntryQty] = useState("");
  const [customer, setCustomer] = useState(null);
  const seid = useRef();
  const seqty = useRef();

  useEffect(() => {
    // Switches the page in Rapid Order
    customer
      ? history.push("/rapidorder/neworder")
      : history.push("/rapidorder/");
  }, [customer]);
  useEffect(() => {
    seid.current.focus();
  }, []);

  const smartEntryQtyChangeHandler = e => {
    smartEntryQty.length > 2
      ? setSmartEntryQty(smartEntryQty.slice(0, 2))
      : setSmartEntryQty(e.target.value);
  };
  const smartEntryIDChangeHandler = e => {
    smartEntryID.length > 4 && seqty.current.focus();
    setSmartEntryID(e.target.value.toUpperCase());
  };
  const customerChangeHandler = (e, value) => setCustomer(value);

  const smartEntrySubmitHandler = e => {
    e.preventDefault();
    try {
      if (smartEntryQty !== "") {
        if (store[smartEntryID] === undefined) {
          // if it doesnt throw an item doesnt exist error because the format is correct
          setSmartEntryID("");
          setSmartEntryQty("");
          seid.current.focus();
          return window.alert("That item does not exist");
        } else {
          if (store[smartEntryID].hasOwnProperty("flavors")) {
            console.log("this item has flavors");
            setSmartEntryID("");
            setSmartEntryQty("");
            dispatch({
              type: "TOGGLE_ATCF",
              item: store[smartEntryID]
            });
            // if it is add the item to the cart
          } else {
            console.log(store[smartEntryID]);
            setSmartEntryID("");
            setSmartEntryQty("");
            seid.current.focus();
            return dispatch({
              type: "ADD_TO_CART",
              item: { ...store[smartEntryID], qty: smartEntryQty }
            });
          }
        }
      } else {
        alert("Please Enter a Quantity");
      }
    } catch (error) {
      console.log(error);
      setSmartEntryID("");
      setSmartEntryQty("");
      window.alert("Formating Error");
    }
  };

  return (
    <RapidOrderWrapper>
      <ControlPanel>
        <CustomerSelect customerChangeHandler={customerChangeHandler} />
        <SmartEntry onSubmit={smartEntrySubmitHandler} className="smart-entry">
          <h3>Order Entry</h3>
          <input
            ref={seid}
            className="seid"
            type="text"
            placeholder="AMS12B"
            autoComplete="off"
            name="rapidentry"
            value={smartEntryID}
            onChange={smartEntryIDChangeHandler}
          />
          <input
            ref={seqty}
            className="seqty"
            type="number"
            min="1"
            max="999"
            placeholder="34"
            autoFocus
            value={smartEntryQty}
            onChange={smartEntryQtyChangeHandler}
          />
          <button style={{ display: "none" }} type="submit"></button>
        </SmartEntry>
      </ControlPanel>
      {customer ? <NewOrder customer={customer} /> : <ROHome />}
    </RapidOrderWrapper>
  );
};

const RapidOrderWrapper = styled.div`
  grid-area: app;
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  background-color: ${Colors.white};
`;

const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: 350px auto;
  justify-content: center;
  padding: 32px 0;
  grid-column-gap: 64px;
`;

const SmartEntry = styled.form`
  white-space: nowrap;
  display: flex;
  align-items: center;
  h3 {
    margin-right: 16px;
    font-family: Poppins-ExtraBold;
    font-size: 18px;
  }
  :first-of-type {
    flex: 1;
    padding-right: 24px;
    input {
      width: 100%;
    }
  }
  :nth-of-type(2) {
    padding-right: 24px;
  }
  input {
    height: 40px;
    border-radius: 4px;
    padding-left: 24px;
    border: none;
    outline: none;
    background-color: ${Colors.lightGrey};
    margin-right: 24px;
  }
  svg {
    margin-right: 16px;
    font-size: 32px;
  }

  .smart-entry {
    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
    .seqty {
      -webkit-appearance: none;
      padding: 0 24px;
    }
    .seid {
      margin-right: 16px;
    }
  }
`;

export default connect(state => {
  return {
    atcVisible: state.RapidOrderState.atcVisible,
    atcfVisible: state.RapidOrderState.atcfVisible,
    cart: state.RapidOrderState.cart,
    store: state.Firestore.data.inventory.beverages
  };
})(withRouter(RapidOrder));

/* <ROControls
        search={search}
        RapidEntry={RapidEntry}
        SmartEntryQty={SmartEntryQty}
        SmartEntryID={SmartEntryID}
      />
      <ROItems filter={search[0]} />
      {OrderPreview} */

/* {atcVisible && <AddToCart clearSearch={search[1]} />}
      {atcfVisible && <AddtoCartFlavors clearSearch={search[1]} />} */

// const OrderEmpty = Object.values(cart).length < 1;
// const OrderPreview = OrderEmpty ? (
//   <EmptyOrder message="Add an item to create a new order" />
// ) : (
//   <ROPreview />
// );
