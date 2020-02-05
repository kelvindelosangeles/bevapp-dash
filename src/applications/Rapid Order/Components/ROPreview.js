import React, { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import uuid from "uuid";
import moment from "moment";

import { Colors } from "../../../constants/Colors";
import { CustomersArray } from "../../../Assets/Data/Customers";

import CustomerDetails from "../../../global/OrderPreview/CustomerDetails";
import OrderDetails from "../../../global/OrderPreview/OrderDetails";
import OrderItems from "../../../global/OrderPreview/OrderItems";
import CustomerSelect from "./CustomerSelect";

const formatTel = tel => {
  return `(${tel.slice(0, 3)}) ${tel.slice(3, 6)} ${tel.slice(6, 10)} `;
};
const ROPreview = ({ order, dispatch, editMode, orderToEdit }) => {
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
          order,
          customer,
          details: {
            orderID,
            createdAt,
            createdBy: "Admin"
          }
        });
  };
  const submitEdit = () => {
    return window.confirm("Are you sure you want to submit this edit")
      ? dispatch({
          type: "SUBMIT_EDIT",
          order,
          customer,
          details: {
            orderID: orderToEdit.details.orderID,
            createdAt,
            createdBy: "Admin"
          }
        })
      : null;
  };

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
        <OrderItems order={order} />
        {error && (
          <ErrorMessage>
            <p>Please Add a Customer</p>
          </ErrorMessage>
        )}
        {editMode ? (
          <EditActions>
            <button onClick={submitEdit}>Submit Edit</button>
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
    background-color: ${Colors.yellow};
    color: ${Colors.black};
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
    order: state.RapidOrderState.order,
    editMode: state.RapidOrderState.editMode,
    orderToEdit: state.RapidOrderState.orderToEdit
  };
})(ROPreview);
