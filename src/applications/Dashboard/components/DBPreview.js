import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import ReactToPrint from "react-to-print";

import { Colors } from "../../../Constants/Colors";

import CustomerDetails from "../../../Global/OrderPreview/CustomerDetails";
import OrderDetails from "../../../Global/OrderPreview/OrderDetails";
import OrderCart from "../../../Global/OrderPreview/OrderCart";
import CustomerCopy from "../../../Global/PrintTemplates/CustomerCopy";

const DBPreview = ({ activeOrder, dispatch, history }) => {
  const [editedOrder, toggleEditedOrder] = useState(false);
  const customerCopy = useRef();
  const { customer, details } = activeOrder;

  const editOrderHandler = () => {
    dispatch({
      type: "EDIT_ORDER",
      order: activeOrder
    });
    history.push("/rapidorder");
  };

  const deleteOrderHandler = () => {
    window.confirm(
      "Are you sure you want to delete this order?  This action is irreversable."
    ) &&
      dispatch({
        type: "DELETE_ORDER",
        orderID: details.orderID
      });
  };

  return (
    <DBPreviewWrapper>
      <div className="wrapper">
        <CustomerDetails
          name={customer.name}
          address={customer.address}
          telephone={customer.telephone}
        />
        <OrderDetails
          orderID={details.orderID}
          createdAt={details.createdAt}
          status="Pending Review"
        />
        {activeOrder.editedOrder.order && (
          <EditedOrderToggle editedOrder={editedOrder}>
            <button
              onClick={() => {
                toggleEditedOrder(false);
              }}
            >
              Original
            </button>
            <button
              onClick={() => {
                toggleEditedOrder(true);
              }}
            >
              Edited
            </button>
          </EditedOrderToggle>
        )}
        {/* FIXME: */}
        {/* ===================== */}
        {/* ===================== */}
        {/* ===================== */}
        {/* edited order toggle is on show edited order */}
        {/* Or check that the new clicked on order has an editfirst */}
        {/* Then Show*/}
        {!editedOrder ? (
          <OrderCart order={activeOrder.cart} readOnly={true} />
        ) : Object.values(activeOrder.editedOrder).length > 0 ? (
          <OrderCart order={activeOrder.editedOrder.cart} readOnly={true} />
        ) : (
          toggleEditedOrder(false) && (
            <OrderCart order={activeOrder.cart} readOnly={true} />
          )
        )}
        {/* ===================== */}
        {/* ===================== */}
        {/* ===================== */}
        {!editedOrder && (
          <OrderActions>
            <div>
              <SmallButton onClick={editOrderHandler}>Edit</SmallButton>
              <ReactToPrint
                trigger={() => <SmallButton>Print</SmallButton>}
                content={() => customerCopy.current}
              />
              <SmallButton onClick={deleteOrderHandler}>Delete</SmallButton>
            </div>
            <button className="complete">Complete Order</button>
          </OrderActions>
        )}
      </div>

      <div style={{ display: "none" }}>
        <CustomerCopy reference={customerCopy} />
      </div>
    </DBPreviewWrapper>
  );
};

const DBPreviewWrapper = styled.div`
  position: relative;
  flex: 1;
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
const OrderActions = styled.section`
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  button {
    height: 40px;
    border-radius: 5px;
    border: none;
    font-family: "AvenirNext-Medium", "Avenir Next", serif;
    font-size: 14px;
  }
  .complete {
    width: 100%;
    background-color: ${Colors.green};
  }
`;
const SmallButton = styled.button`
  width: 80px;
  :first-of-type {
    background-color: ${Colors.yellow};
  }
  :nth-of-type(2) {
    background-color: ${Colors.blue};
  }
  :nth-of-type(3) {
    background-color: ${Colors.red};
  }
`;
const EditedOrderToggle = styled.section`
  display: flex;
  justify-content: space-evenly;
  button {
    width: 40%;
    padding: 18px 0;
    border: none;
    font-family: Gilroy-ExtraBold;
    font-size: 16px;

    cursor: pointer;
    :first-of-type {
      border-bottom: 4px solid
        ${props => {
          return props.editedOrder ? "white" : "black";
        }};
    }
    :last-of-type {
      border-bottom: 4px solid
        ${props => {
          return props.editedOrder ? "black" : "white";
        }};
    }
  }
`;

export default connect(state => {
  return {
    activeOrder: state.DashboardState.activeOrder
  };
})(withRouter(DBPreview));
