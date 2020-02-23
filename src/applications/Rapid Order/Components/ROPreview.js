import React, { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import styled from "styled-components";
import uuid from "uuid";
import moment from "moment";

import { Colors } from "../../../Constants/Colors";

import CustomerDetails from "../../../Global/OrderPreview/CustomerDetails";
import OrderDetails from "../../../Global/OrderPreview/OrderDetails";
import OrderCart from "../../../Global/OrderPreview/OrderCart";
import CustomerSelect from "./CustomerSelect";
import { compose } from "redux";
import { Order } from "../../../Models/Order";

const formatTel = tel => {
  return `(${tel.slice(0, 3)}) ${tel.slice(3, 6)} ${tel.slice(6, 10)} `;
};

const ROPreview = ({ cart, dispatch, editMode, orderToEdit, firestore }) => {
  const [customer, setCustomer] = useState(null);
  const [error, showError] = useState(false);

  useEffect(() => {
    editMode && setCustomer({ ...orderToEdit.customer });
  }, []);

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
  const customerChangeHandler = (e, value) => {
    showError(false);
    setCustomer(value);
  };
  const cancelOrder = () => {
    window.confirm("Are you sure you want to cancel this order") &&
      dispatch({
        type: "CANCEL_ORDER"
      });
  };
  const submitOrder = () => {
    const NewOrder = {
      customer,
      details: {
        new: true,
        complete: false,
        createdAt,
        createdBy: "General Admin",
        orderID
      },
      cart,
      editedOrder: null
    };

    return !customer
      ? showError(true)
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
            dispatch({ type: "SUBMIT_ORDER" });
          })
          .catch(err => {
            console.log(err);
          });
  };
  const submitEdit = () => {
    return window.confirm("Are you sure you want to submit this edit")
      ? firestore
          .update(
            {
              collection: "orders",
              doc: orderToEdit.details.orderID
            },
            {
              editedOrder: {
                cart,
                details: {
                  editedAt: createdAt,
                  editdBy: "General Admin"
                }
              }
            }
          )
          .then(() => {
            dispatch({
              type: "SUBMIT_EDIT"
            });
            console.log("success");
          })
          .catch(err => {
            console.log(err);
          })
      : null;
    // return window.confirm("Are you sure you want to submit this edit")
    //   ? dispatch({
    //       type: "SUBMIT_EDIT",
    //       cart,
    //       customer,
    //       details: {
    //         orderID: orderToEdit.details.orderID,
    //         createdAt,
    //         createdBy: "Admin"
    //       }
    //     })
    //   : null;
  };

  // Prevents the last item from being deleted while editing
  const disabled = Object.values(cart).length < 2;
  // const disabled = false;

  return (
    <ROrderWrapper>
      <div className="wrapper">
        {/* NOTIFICATION TO LET THE CUSTOMER KNOW THEY ARE IN EDIT MODE */}
        {editMode && (
          <EditMode>
            <h3>EDIT MODE</h3>
          </EditMode>
        )}
        {/* THE CUSTOMER SELECT FEATURE IS ONLY FOR NEW ORDERS */}
        {!editMode && (
          <CustomerSelect customerChangeHandler={customerChangeHandler} />
        )}
        {customer && (
          <CustomerDetails
            name={customer.name}
            address={customer.address}
            telephone={customer.telephone}
          />
        )}
        <OrderDetails
          // THE ORDER ID DISPLAYED WILL EITHER BE NEW OR FROM THE EDITED ORDER
          orderID={editMode ? orderToEdit.details.orderID : orderID}
          createdAt={createdAt}
          status={editMode ? "Editing Order" : "New Order"}
        />
        <OrderCart cart={cart} />
        {error && (
          <ErrorMessage>
            <p>Please Add a Customer</p>
          </ErrorMessage>
        )}
        {editMode ? (
          <EditActions disabled={disabled}>
            <button onClick={submitEdit} disabled={disabled}>
              Submit Edit
            </button>
            <button onClick={cancelOrder}>Cancel</button>
          </EditActions>
        ) : (
          <OrderActions>
            <button onClick={submitOrder}>Complete Order</button>
            <button onClick={cancelOrder}>Cancel</button>
          </OrderActions>
        )}
      </div>
    </ROrderWrapper>
  );
};

const ROrderWrapper = styled.div`
  position: relative;
  grid-area: preview;
  height: 100%;
  background-color: ${Colors.white};
  .wrapper {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: scroll;
  }
  section {
    padding: 32px;
    border-bottom: 1px solid ${Colors.lightGrey};
  }
`;
const EditMode = styled.section`
  background-color: ${Colors.yellow};
  color: ${Colors.black};
  text-align: center;
  font-family: "AvenirNext-Heavy";
`;
const OrderActions = styled.section`
  display: flex;

  button {
    height: 40px;
    border-radius: 5px;
    border: none;
    font-family: "AvenirNext-Medium";
    font-size: 14px;
    width: 100%;
    color: ${Colors.white};
    background-color: ${Colors.green};
    cursor: pointer;
    :nth-of-type(2) {
      color: ${Colors.white};
      background-color: ${Colors.red};
      margin-left: 16px;
    }
  }
`;
const EditActions = styled(OrderActions)`
  button {
    background-color: ${props => {
      return props.disabled ? Colors.grey : Colors.yellow;
    }};
    color: ${props => {
      return props.disabled ? Colors.white : Colors.black;
    }};
  }
`;
const ErrorMessage = styled.section`
  p {
    font-family: "AvenirNext-Medium";
    color: ${Colors.red};
    text-align: center;
    /* margin-bottom: 16px; */
  }
`;

export default compose(
  connect(state => {
    return {
      cart: state.RapidOrderState.cart,
      editMode: state.RapidOrderState.editMode,
      orderToEdit: state.RapidOrderState.orderToEdit
    };
  }),
  firestoreConnect()
)(ROPreview);
