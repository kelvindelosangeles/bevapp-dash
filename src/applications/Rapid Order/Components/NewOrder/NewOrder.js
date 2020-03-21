import React, { useMemo, useState, useRef } from "react";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import styled from "styled-components";
import moment from "moment";
import uuid from "uuid";
import CartIcon from "@material-ui/icons/ShoppingCartRounded";
import DeleteIcon from "@material-ui/icons/Delete";

import { Colors } from "../../../../Constants/Colors";
import { Order as OrdersModel } from "../../../../Models/Order";
import CustomerSelect from "../CustomerSelect";
import SmartEntry from "./Components/SmartEntry";
import CustomerDetails from "../../../../Global/OrderPreview/CustomerDetails";
import OrderDetails from "../../../../Global/OrderPreview/OrderDetails";
import CartHeader from "./Components/CartHeader";

const NewOrder = ({ cart, customer, firestore, dispatch, notes }) => {
  const [smartEntryID, setSmartEntryID] = useState("");
  const [smartEntryQty, setSmartEntryQty] = useState("");

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
      return (
        window.confirm(`Delete ${i.id} ?`) &&
        dispatch({
          type: "REMOVE_ITEM",
          id: i.id
        })
      );
    };
    const flavors = () => {
      try {
        return (
          i.flavors &&
          Object.entries(i.flavorsQuantity)
            .filter(y => {
              return y[1] > 0;
            })
            .map(x => {
              return (
                <Flavor>
                  {x[0]} x {x[1]}
                </Flavor>
              );
            })
        );
      } catch (error) {
        console.log(error);
        return "Flavors err";
      }
    };
    return (
      <React.Fragment>
        <p>{i.id}</p>
        <p>{i.qty} x</p>
        <p>
          {i.description} {flavors()}
        </p>
        <p>{i.price}</p>
        <p>{i.price}</p>
        <p className="item-total">{OrdersModel.CalculateItem(i)}</p>
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
          .update(
            {
              collection: "orders",
              doc: "orders"
            },
            { [orderID]: { ...NewOrder } }
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
      ? window.confirm("Are you sure you want to cancel this order?") &&
          dispatch({
            type: "CANCEL_ORDER"
          })
      : dispatch({
          type: "SET_CUSTOMER",
          customer: value
        });
  };
  const notesChangeHandler = e => {
    dispatch({
      type: "SET_NOTE",
      payload: e.target.value
    });
  };

  return (
    <Container>
      {/* NEW ORDER CONTOLS ============= */}
      <Controls>
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
      </Controls>

      {/* Customer Details ============== */}
      <CustomerDetails
        name={customer.name}
        address={customer.address}
        telephone={customer.telephone}
        gridArea="B"
      />
      <OrderDetails
        orderID={orderID}
        createdAt={createdAt}
        status={"New Order"}
        gridArea="C"
      />
      <Notes>
        <h3>NOTES</h3>
        <textarea
          rows={5}
          onChange={notesChangeHandler}
          value={notes}
          placeholder={"Enter order notes here."}
        />
      </Notes>

      {/* Cart ============== */}
      <Cart>
        <h3>
          <CartIcon />
          Cart
        </h3>
        <div>
          <CartHeader />
          {CartArray}
        </div>
      </Cart>

      {/* Actions ============== */}
      <Actions>
        <div>
          <h3>Total</h3>
          <h3>
            {!OrdersModel.isCartEmpty(cart) && "$ "}
            {!OrdersModel.isCartEmpty(cart) && OrdersModel.CalculateCart(cart)}
          </h3>
          <h3>Cases</h3>
          <h3>
            {!OrdersModel.isCartEmpty(cart) && OrdersModel.CalculateCases(cart)}
          </h3>
        </div>
        <span>
          <button onClick={submitOrder}>Submit</button>
          <button onClick={cancelOrder}>Cancel</button>
        </span>
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  height: fit-content;
  padding: 32px 0;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 200px 1fr auto;
  grid-template-areas:
    "A A A"
    "B C D"
    "E E E"
    ". F F";
`;
const Controls = styled.div`
  grid-area: A;
  display: grid;
  grid-template-columns: 350px auto;
  justify-content: center;
  align-items: self-start;
  grid-column-gap: 64px;
`;
const Notes = styled.section`
  grid-area: D;
  padding: 32px;
  h3 {
    font-family: Poppins-Bold;
    font-size: 16px;
    color: #000000;
    margin-bottom: 8px;
  }
  textarea {
    width: 100%;
    font-size: 12px;
    border: none;
    resize: none;
    font-family: "Poppins-Medium";
    font-size: 14px;
  }
`;
const Cart = styled.div`
  grid-area: E;
  h3 {
    display: flex;
    align-items: center;
    font-family: Poppins-ExtraBold;
    font-size: 20px;
    color: #000000;
    margin-left: 32px;
    margin-bottom: 32px;
    svg {
      font-size: 20px;
      margin-right: 12px;
    }
  }
  div {
    display: grid;
    grid-template-columns: 2fr 2fr 4fr 2fr 2fr 2fr 1fr;
    grid-gap: 16px 40px;
    padding: 0 32px;
    margin-bottom: 80px;
    h5 {
      font-family: Poppins-Bold;
      font-size: 18px;
    }
    p {
      font-family: Poppins-Medium;
      font-size: 16px;
      color: #000000;
    }
    .item-total {
      font-family: Poppins-Bold;
    }
    svg:hover {
      color: ${Colors.red};
      cursor: pointer;
    }
  }
`;
const Actions = styled.div`
  grid-area: F;
  justify-self: flex-end;
  margin-right: 32px;
  margin-top: auto;
  div {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-row-gap: 8px;
    margin-bottom: 32px;
  }
  h3 {
    font-family: Poppins-SemiBold;
    font-size: 24px;
  }
  span {
    display: flex;
    margin-top: 16px;
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
const Flavor = styled.p`
  font-family: Poppins-Regular !important;
  font-size: 14px !important;
  margin-left: 16px;
  margin-top: 8px;
  padding: 0px 0px;
`;

export default connect(state => {
  return {
    cart: state.RapidOrderState.cart,
    store: state.Firestore.data.inventory.beverages,
    notes: state.RapidOrderState.notes,
    customer: state.RapidOrderState.customer
  };
})(withFirestore(NewOrder));
