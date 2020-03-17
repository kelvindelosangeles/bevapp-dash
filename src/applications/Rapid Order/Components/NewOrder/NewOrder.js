import React, { useMemo, useState, useRef } from "react";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import styled from "styled-components";
import moment from "moment";
import uuid from "uuid";

import CartIcon from "@material-ui/icons/ShoppingCartRounded";
import DeleteIcon from "@material-ui/icons/Delete";

import CustomerSelect from "../CustomerSelect";
import { Colors } from "../../../../Constants/Colors";

import CustomerDetails from "../../../../Global/OrderPreview/CustomerDetails";
import OrderDetails from "../../../../Global/OrderPreview/OrderDetails";
import SmartEntry from "./Components/SmartEntry";

const NewOrder = ({ cart, store, customer, firestore, dispatch }) => {
  const [smartEntryID, setSmartEntryID] = useState("");
  const [smartEntryQty, setSmartEntryQty] = useState("");

  const [notes, setNotes] = useState("");

  const orderID = useMemo(() => {
    return (
      moment(new Date()).format("YYMMDD") +
      uuid().slice(0, 8) +
      "ga"
    ).toUpperCase();
  }, []);
  const createdAt = useMemo(() => {
    return moment(new Date()).format("MMM DD, h:mm");
  });
  const CartArray = Object.values(cart).map(i => {
    const removeItem = () => {
      return dispatch({
        type: "REMOVE_ITEM",
        id: i.id
      });
    };

    return (
      <React.Fragment>
        <p>{i.id}</p>
        <p>{i.qty} x</p>
        <p>{i.description}</p>
        <p>{i.price}</p>
        <p>{i.price}</p>
        <p>0.00</p>
        <DeleteIcon onClick={removeItem} />
      </React.Fragment>
    );
  });

  const submitOrder = () => {
    const NewOrder = {
      customer,
      details: {
        new: true,
        complete: false,
        createdAt,
        createdBy: "General Admin",
        orderID,
        notes
      },
      cart,
      editedOrder: null
    };

    return Object.values(cart).length < 1
      ? alert("The order cannot be submited if the cart is empty")
      : firestore
          .set(
            {
              collection: "orders",
              doc: orderID
            },
            NewOrder
          )
          .then(() => {
            console.log("success");
            dispatch({
              type: "SET_CUSTOMER",
              customer: null
            });
            dispatch({ type: "SUBMIT_ORDER" });
          })
          .catch(err => {
            console.log(err);
          });
  };
  const cancelOrder = () => {
    window.confirm("Are you sure you want to cancel this order") &&
      dispatch({
        type: "CANCEL_ORDER"
      });
  };

  const customerChangeHandler = (e, value) => {
    return value === null
      ? window.confirm("Are you sure you want to cancle this order?") &&
          dispatch({
            type: "CANCEL_ORDER"
          })
      : dispatch({
          type: "SET_CUSTOMER",
          customer: value
        });
  };
  const notesChangeHandler = e => {
    setNotes(e.target.value);
  };

  return (
    <NewOrderWrapper>
      <ControlPanel>
        <CustomerSelect
          customerChangeHandler={customerChangeHandler}
          selectedCustomer={customer}
        />
        <SmartEntry
          smartEntryID={smartEntryID}
          smartEntryQty={smartEntryQty}
          setSmartEntryQty={setSmartEntryQty}
          setSmartEntryID={setSmartEntryID}
        />
      </ControlPanel>

      <NewOrderDetails>
        <CustomerDetails
          name={customer.name}
          address={customer.address}
          telephone={customer.telephone}
        />
        <OrderDetails
          orderID={orderID}
          createdAt={createdAt}
          status={"New Order"}
        />
        <section>
          <DetailTitle>Notes</DetailTitle>
          <NotesInput rows={4} onChange={notesChangeHandler} />
        </section>
      </NewOrderDetails>

      <h4>
        <CartIcon /> Cart
      </h4>
      <CartGrid>
        <h5>ID</h5>
        <h5>Quantity</h5>
        <h5>Description</h5>
        <h5>Cost</h5>
        <h5>Price</h5>
        <h5>Total</h5>
        <span></span>
        {CartArray}
      </CartGrid>
      <Actions>
        <h3>Total $ </h3>
        <span>
          <button onClick={submitOrder}>Submit</button>
          <button onClick={cancelOrder}>Cancel</button>
        </span>
      </Actions>
    </NewOrderWrapper>
  );
};

const NewOrderWrapper = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  h4 {
    display: flex;
    align-items: center;
    margin-left: 24px;
    margin-bottom: 48px;
    font-family: Poppins-ExtraBold;
    font-size: 24px;
    svg {
      margin-right: 4px;
    }
  }
`;
const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: 350px auto;
  justify-content: center;
  padding: 32px 0;
  grid-column-gap: 64px;
`;

const NewOrderDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 56px;
  section {
    padding: 32px;
    border-bottom: 1px solid ${Colors.lightGrey};
  }
`;
const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 4fr 2fr 2fr 2fr 1fr;
  grid-gap: 16px 40px;
  padding: 0 32px;
  margin-bottom: 80px;
  h5 {
    font-family: Poppins-Bold;
    font-size: 18px;
    margin-bottom: 40px;
  }
  p {
    font-family: Poppins-Medium;
    font-size: 16px;
    color: #000000;
  }
`;
const Actions = styled.div`
  align-self: flex-end;
  margin-right: 32px;
  margin-top: auto;
  h3 {
    font-family: Poppins-Bold;
    font-size: 24px;
    margin-bottom: 32px;
  }
  span {
    display: flex;
  }
  button {
    font-family: Poppins-Medium;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    padding: 8px 36px;
    min-width: 184px;
    border: 1px solid ${Colors.red};
    color: ${Colors.red};
    background-color: transparent;
    margin-left: 24px;
    border-radius: 4px;
    :first-of-type {
      background-color: ${Colors.green};
      color: ${Colors.white};
      border: none;
      margin: 0;
    }
  }
`;
const DetailTitle = styled.h5`
  font-family: Poppins-ExtraBold;
  font-size: 18px;
  color: #000000;
`;
const NotesInput = styled.textarea`
  width: 100%;
  margin-top: 16px;
  font-family: poppins;
  font-size: 12px;
  border: none;
  resize: none;
`;

export default connect(state => {
  return {
    cart: state.RapidOrderState.cart,
    store: state.Firestore.data.inventory.beverages,
    customer: state.RapidOrderState.customer
  };
})(withFirestore(NewOrder));
