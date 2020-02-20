import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ReactToPrint from "react-to-print";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Colors } from "../../../Constants/Colors";

import CustomerDetails from "../../../Global/OrderPreview/CustomerDetails";
import OrderDetails from "../../../Global/OrderPreview/OrderDetails";
import OrderCart from "../../../Global/OrderPreview/OrderCart";
import CustomerCopy from "../../../Global/PrintTemplates/CustomerCopy";
import WarehouseCopy from "../../../Global/PrintTemplates/WarehouseCopy";

const DBPreview = ({ activeOrder, dispatch, history }) => {
  const customerCopy = useRef();
  const warehouseCopy = useRef();
  const [showEditedOrder, toggleShowEditedOrder] = useState(false);

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
        orderID: activeOrder.details.orderID
      });
  };

  const OrderCartLogic = () => {
    try {
      return (
        <OrderCart
          cart={
            showEditedOrder ? activeOrder.editedOrder.cart : activeOrder.cart
          }
          readOnly={true}
        />
      );
    } catch (error) {
      return <OrderCart cart={activeOrder.cart} readOnly={true} />;
    }
  };

  const ShowEditToggle = activeOrder.editedOrder && (
    <EditedOrderToggle editedOrder={showEditedOrder}>
      <button
        onClick={() => {
          toggleShowEditedOrder(false);
        }}
      >
        Original
      </button>
      <button
        onClick={() => {
          toggleShowEditedOrder(true);
        }}
      >
        Edited
      </button>
    </EditedOrderToggle>
  );

  const showOrderActions = !showEditedOrder ? (
    <OrderActions>
      <Edit onClick={editOrderHandler}>Edit</Edit>
      <ReactToPrint
        trigger={() => <PrintC>Print CX</PrintC>}
        content={() => customerCopy.current}
      />
      <ReactToPrint
        trigger={() => <PrintWH>Print WH</PrintWH>}
        content={() => warehouseCopy.current}
      />
      <Complete>Complete </Complete>
      <Delete onClick={deleteOrderHandler}>Delete</Delete>
    </OrderActions>
  ) : (
    <OrderActions>
      <ReactToPrint
        trigger={() => <EPrintC>Print CX</EPrintC>}
        content={() => customerCopy.current}
      />
      <ReactToPrint
        trigger={() => <EPrintWH>Print WH</EPrintWH>}
        content={() => warehouseCopy.current}
      />
      <EDelete onClick={deleteOrderHandler}>Delete</EDelete>
    </OrderActions>
  );

  return (
    <DBPreviewWrapper>
      <div className="wrapper">
        <CustomerDetails
          name={activeOrder.customer.name}
          address={activeOrder.customer.address}
          telephone={activeOrder.customer.telephone}
        />
        <OrderDetails
          orderID={activeOrder.details.orderID}
          createdAt={activeOrder.details.createdAt}
          status="Pending Review"
        />
        {ShowEditToggle}
        {OrderCartLogic()}
        {showOrderActions}
      </div>

      <PrintContainer>
        <CustomerCopy
          reference={customerCopy}
          editedCopy={showEditedOrder}
          activeOrder={activeOrder}
        />
        <WarehouseCopy
          reference={warehouseCopy}
          editedCopy={showEditedOrder}
          activeOrder={activeOrder}
        />
      </PrintContainer>
    </DBPreviewWrapper>
  );
};

const DBPreviewWrapper = styled.div`
  grid-area: preview;
  position: relative;
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
const OrderActions = styled.section`
  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 24px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas:
    "a a a a b b b b c c c c"
    "d d d d d d e e e e e e";
`;

const Action = styled.button`
  height: 40px;
  width: 100%;
  border-radius: 5px;
  border: none;
  font-family: "AvenirNext-Medium", "Avenir Next", serif;
  font-size: 14px;
`;

const Edit = styled(Action)`
  background-color: ${Colors.yellow};
  grid-area: a;
`;
const PrintC = styled(Action)`
  background-color: ${Colors.blue};
  grid-area: b;
`;
const PrintWH = styled(Action)`
  background-color: lightblue;
  grid-area: c;
`;
const Complete = styled(Action)`
  background-color: ${Colors.green};
  grid-area: d;
`;
const Delete = styled(Action)`
  background-color: ${Colors.red};
  grid-area: e;
`;
const EPrintC = styled(Action)`
  background-color: ${Colors.blue};
  grid-area: a;
`;
const EPrintWH = styled(Action)`
  background-color: lightblue;
  grid-area: b;
`;
const EDelete = styled(Action)`
  background-color: ${Colors.red};
  grid-area: c;
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

const PrintContainer = styled.div`
  display: none;
`;

export default connect()(withRouter(DBPreview));
