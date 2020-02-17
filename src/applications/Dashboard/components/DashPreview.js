import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import ReactToPrint from "react-to-print";

import { Colors } from "../../../constants/Colors";

import CustomerDetails from "../../../Global/OrderPreview/CustomerDetails";
import OrderDetails from "../../../Global/OrderPreview/OrderDetails";
import OrderItems from "../../../Global/OrderPreview/OrderItems";
import CustomerCopy from "../../../Global/PrintTemplates/CustomerCopy";

const DashPreview = props => {
  const { customer, details, order } = props.order;
  const [editedOrder, toggleEditedOrder] = useState(false);
  const customerCopy = useRef();

  const editOrderHandler = () => {
    props.dispatch({
      type: "EDIT_ORDER",
      order: props.order
    });
    props.history.push("/rapidorder");
  };

  const deleteOrderHandler = () => {
    window.confirm(
      "Are you sure you want to delete this order?  This action is irreversable."
    ) &&
      props.dispatch({
        type: "DELETE_ORDER",
        orderID: details.orderID
      });
  };

  return (
    <DashPreviewWrapper>
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
        {props.order.editedOrder.order && (
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

        <OrderItems
          order={!editedOrder ? order : props.activeOrder.editedOrder.order}
          readOnly={true}
        />

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
      </div>

      <div style={{ display: "none" }}>
        <CustomerCopy reference={customerCopy} />
      </div>
    </DashPreviewWrapper>
  );
};

const DashPreviewWrapper = styled.div`
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
    order: state.DashboardState.activeOrder,
    activeOrder: state.DashboardState.activeOrder
  };
})(withRouter(DashPreview));
