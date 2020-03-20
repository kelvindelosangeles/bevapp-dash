import React, { useRef } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import ReactToPrint from "react-to-print";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import CustomerDetails from "../../../Global/OrderPreview/CustomerDetails";
import OrderDetails from "../../../Global/OrderPreview/OrderDetails";
import Notes from "../../../Global/OrderPreview/Notes";
import OrderCart from "../../../Global/OrderPreview/OrderCart";
import CustomerCopy from "../../../Global/PrintTemplates/CustomerCopy";
import WarehouseCopy from "../../../Global/PrintTemplates/WarehouseCopy";

const DBPreview = ({ activeOrder, dispatch, firestore, orders }) => {
  const customerCopy = useRef();
  const warehouseCopy = useRef();

  const deleteOrderHandler = () => {
    const { [activeOrder.details.orderID]: removed, ...NewOrder } = orders;

    window.confirm(
      "Are you sure you want to delete this order?  This action is irreversable."
    ) &&
      firestore
        .set(
          {
            collection: "deletedOrders",
            doc: activeOrder.details.orderID
          },
          activeOrder
        )
        .then(() => {
          firestore.set(
            {
              collection: "orders",
              doc: "orders"
            },
            NewOrder
          );
        })
        .then(() => {
          dispatch({
            type: "DELETE_ORDER"
          });
        })
        .catch(err => {
          console.log(err);
          alert("Something Went Wrong Please Contact Admin");
        });
  };

  return (
    <Container>
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
        {activeOrder.details.notes && (
          <Notes text={activeOrder.details.notes} />
        )}
        <OrderCart cart={activeOrder.cart} readOnly={true} />
        <OrderActions>
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
      </div>

      <PrintContainer>
        <CustomerCopy reference={customerCopy} activeOrder={activeOrder} />
        <WarehouseCopy reference={warehouseCopy} activeOrder={activeOrder} />
      </PrintContainer>
    </Container>
  );
};

const Container = styled.div`
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
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "b c"
    "d e";
`;
const Action = styled.button`
  height: 40px;
  width: 100%;
  border-radius: 5px;
  border: none;
  font-family: "AvenirNext-Medium";
  font-size: 16px;
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
const PrintContainer = styled.div`
  display: none;
`;

export default compose(
  connect(state => {
    return { orders: state.Firestore.ordered.orders[0] };
  }),
  firestoreConnect()
)(withRouter(DBPreview));
