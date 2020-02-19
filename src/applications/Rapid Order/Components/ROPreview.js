import React, { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import uuid from "uuid";
import moment from "moment";

import { Colors } from "../../../Constants/Colors";

import CustomerDetails from "../../../Global/OrderPreview/CustomerDetails";
import OrderDetails from "../../../Global/OrderPreview/OrderDetails";
import OrderCart from "../../../Global/OrderPreview/OrderCart";
import CustomerSelect from "./CustomerSelect";

const formatTel = tel => {
  return `(${tel.slice(0, 3)}) ${tel.slice(3, 6)} ${tel.slice(6, 10)} `;
};

const ROPreview = ({ cart, dispatch, editMode, orderToEdit }) => {
  const [customer, setCustomer] = useState(null);
  const [error, showError] = useState(false);

  useEffect(() => {
    editMode && setCustomer({ ...orderToEdit.customer });
  }, []);

  const orderID = useMemo(() => {
    return moment(new Date()).format("YYMMDD") + uuid().slice(0, 8) + "aa";
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
    return !customer
      ? showError(true)
      : dispatch({
          type: "SUBMIT_ORDER",
          cart,
          customer,
          details: {
            orderID,
            createdAt,
            createdBy: "Admin"
            // TODO: Change this when auth added
          }
        });
  };
  const submitEdit = () => {
    return window.confirm("Are you sure you want to submit this edit")
      ? dispatch({
          type: "SUBMIT_EDIT",
          cart,
          customer,
          details: {
            orderID: orderToEdit.details.orderID,
            createdAt,
            createdBy: "Admin"
          }
        })
      : null;
  };

  // Prevents the last item from being deleted while editing
  const disabled = Object.values(cart).length < 2;

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
        {console.log("this is the order", cart)}
        <OrderCart order={cart} />
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
  grid-area: rorder;
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
  font-family: "AvenirNext-Heavy", "Avenir Next", serif;
`;

const OrderActions = styled.section`
  display: flex;

  button {
    height: 40px;
    border-radius: 5px;
    border: none;
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
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
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    color: ${Colors.red};
    text-align: center;
    /* margin-bottom: 16px; */
  }
`;

export default connect(state => {
  return {
    cart: state.RapidOrderState.cart,
    editMode: state.RapidOrderState.editMode,
    orderToEdit: state.RapidOrderState.orderToEdit
  };
})(ROPreview);
