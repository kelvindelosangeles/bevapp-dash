import React, { useMemo, useState, useRef } from "react";
import { connect, useSelector } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import styled from "styled-components";
import CartIcon from "@material-ui/icons/ShoppingCartRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import { Colors } from "../../../../Constants/Colors";
import { Order as OrdersModel } from "../../../../Models/Order";
import CustomerSelect from "../../../../Global/CustomerSelect/CustomerSelect";
import SmartEntry from "./Components/SmartEntry";
import CustomerDetails from "../../../../Global/OrderPreview/CustomerDetails";
import OrderDetails from "../../../../Global/OrderPreview/OrderDetails";
import CartHeader from "./Components/CartHeader";
import { useSnackbar } from "notistack";
import { cancelOrder } from "../../../../redux/actions/RapidOrderActions";

const NewOrder = ({ cart, customer, firestore, dispatch, notes }) => {
    const open = useSelector((state) => state.GlobalState.drawerOpen);
    const [smartEntryID, setSmartEntryID] = useState("");
    const [smartEntryQty, setSmartEntryQty] = useState("");
    const orderID = useSelector((state) => state.RapidOrderState.orderID);
    const { enqueueSnackbar } = useSnackbar();

    const triggerSnack = (variant, message) => {
        return enqueueSnackbar(message, {
            variant,
            anchorOrigin: {
                vertical: "top",
                horizontal: "left",
            },
        });
    };

    const createdAt = useMemo(() => {
        return `${new Date()}`;
    });

    // .format("MMM DD, h:mm")
    const CartArray = Object.values(cart).map((i) => {
        const removeItem = () => {
            if (window.confirm(`Delete ${i.id} ?`)) {
                triggerSnack("error", `Deleted Item ${i.id}`);
                dispatch({
                    type: "REMOVE_ITEM",
                    id: i.id,
                });
            }
        };
        const flavors = () => {
            try {
                return (
                    i.flavors &&
                    Object.entries(i.flavorsQuantity)
                        .filter((y) => {
                            return y[1] > 0;
                        })
                        .map((x) => {
                            return (
                                <Flavor onClick={() => Toggleatc(i)}>
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
        const Toggleatc = (a) => {
            // FIXME: Move the logic to the actons
            dispatch({
                type: a.flavors ? "TOGGLE_ATCF" : "TOGGLE_ATC",
                item: a,
            });
        };
        let hasSpecialPrice = () => {
            try {
                return "$ " + parseFloat(customer.specialPrices[i.id].price).toFixed(2);
            } catch (err) {
                return null;
            }
        };

        return (
            <div className='order-item'>
                <p>{i.id}</p>
                <p id='qty' onClick={() => Toggleatc(i)}>
                    {i.qty} x
                </p>
                <p>
                    {i.description} {flavors()}
                </p>
                <p>$ {i.price}</p>
                <p className='specialPrice'>{hasSpecialPrice()}</p>
                <p className='item-total'>{OrdersModel.CalculateItem(i, customer.specialPrices)}</p>
                <DeleteIcon onClick={removeItem} />
            </div>
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
                notes,
            },
            cart,
            editedOrder: null,
        };
        return Object.values(cart).length < 1
            ? alert("The order cannot be submited if the cart is empty")
            : firestore
                  .update(
                      {
                          collection: "ordersv2",
                          doc: "orders",
                      },
                      { [orderID]: { ...NewOrder } }
                  )
                  .then(() => {
                      console.log("success");
                      dispatch({ type: "SUBMIT_ORDER" });
                  })
                  .catch((err) => {
                      console.log(err);
                  });
    };

    const customerChangeHandler = (e, value) => {
        return value === null
            ? window.confirm("Are you sure you want to cancel this order?") &&
                  dispatch({
                      type: "CANCEL_ORDER",
                  })
            : dispatch({
                  type: "SET_CUSTOMER",
                  customer: value,
              });
    };
    const notesChangeHandler = (e) => {
        dispatch({
            type: "SET_NOTE",
            payload: e.target.value,
        });
    };
    // BETA
    const editMode = useSelector((state) => state.RapidOrderState.editMode);

    return (
        <React.Fragment>
            {editMode && (
                <EditWarning>
                    <p className='warning'>Edit Mode</p>
                </EditWarning>
            )}
            <Container>
                <Controls>
                    <CustomerSelect customerChangeHandler={customerChangeHandler} selectedCustomer={customer} />
                    <SmartEntry
                        smartEntryID={smartEntryID}
                        smartEntryQty={smartEntryQty}
                        setSmartEntryQty={setSmartEntryQty}
                        setSmartEntryID={setSmartEntryID}
                    />
                </Controls>

                {/* Customer Details ============== */}
                <CustomerDetails name={customer.name} address={customer.address} telephone={customer.telephone} gridArea='B' />
                <OrderDetails orderID={orderID} createdAt={createdAt} status={"New Order"} gridArea='C' />
                <Notes>
                    <h3>NOTES</h3>
                    <textarea rows={5} onChange={notesChangeHandler} value={notes} placeholder={"Enter order notes here."} />
                </Notes>

                {/* Cart ============== */}
                <Cart>
                    <header>
                        <CartIcon />
                        <h3>Cart</h3>
                    </header>
                    <div className='cart-grid'>
                        <CartHeader />
                        {CartArray.reverse()}
                    </div>
                </Cart>

                {/* Actions ============== */}
                <Actions>
                    <div>
                        <h3>Total</h3>
                        <h3>
                            {!OrdersModel.isCartEmpty(cart) && "$ "}
                            {!OrdersModel.isCartEmpty(cart) && OrdersModel.CalculateCart(cart, customer.specialPrices)}
                        </h3>
                        <h3>Cases</h3>
                        <h3>{!OrdersModel.isCartEmpty(cart) && OrdersModel.CalculateCases(cart)}</h3>
                    </div>
                    <span>
                        <button onClick={submitOrder}>Submit</button>
                        <button onClick={() => dispatch(cancelOrder())}>Cancel</button>
                    </span>
                </Actions>
            </Container>
        </React.Fragment>
    );
};
const EditWarning = styled.div`
    padding: 16px;
    background-color: #ffcc00;
    .warning {
        font-size: 20px;
        font-weight: 800;
        text-align: center;
    }
`;
const Container = styled.div`
    min-height: 100%;
    width: 100%;
    position: relative;
    display: grid;
    height: fit-content;
    padding: 0 0 32px 0;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px 200px 1fr auto;
    grid-template-areas:
        "A A A"
        "B C D"
        "E E E"
        ". F F";
`;
const Controls = styled.div`
    width: 100%;
    position: absolute;
    grid-area: A;
    display: grid;
    grid-template-columns: 350px auto;
    justify-content: center;
    align-items: self-start;
    grid-column-gap: 64px;
    padding: 16px 0;
    background-color: white;
`;
const Notes = styled.section`
    grid-area: D;
    padding: 32px;
    h3 {
        font-weight: 700;
        font-size: 16px;
        color: #000000;
        margin-bottom: 8px;
    }
    textarea {
        width: 100%;
        font-size: 12px;
        border: none;
        resize: none;

        font-weight: 500;
        font-size: 14px;
    }
`;
const Cart = styled.div`
    grid-area: E;
    padding: 32px 16px;
    header {
        display: flex;
        align-items: center;
        margin-bottom: 32px;
        margin-left: 16px;
        svg {
            font-size: 20px;
            margin-right: 12px;
        }
        h3 {
            font-weight: 900;
            font-size: 20px;
        }
    }
    .cart-grid {
        display: grid;
        grid-row-gap: 8px;
        h5 {
            font-size: 16px;
            margin-bottom: 16px;
        }
        .order-item {
            display: grid;
            padding: 8px 16px;
            border-radius: 4px;
            grid-column-gap: 16px;
            grid-template-columns: 1fr 1fr 3fr 1fr 1fr 1fr 20px;
            font-size: 16px;
            :nth-of-type(even) {
                background-color: ${Colors.lightGrey};
            }
            .item-total {
                font-weight: 700;
            }
            .specialPrice {
                color: ${Colors.purple};
            }
            svg:hover {
                color: ${Colors.red};
                cursor: pointer;
            }
            #qty {
                cursor: pointer;
                :hover {
                    color: ${Colors.green};
                }
            }
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
        font-weight: 600;
        font-size: 24px;
    }
    span {
        display: flex;
        margin-top: 16px;
    }
    button {
        font-weight: 500;
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
        cursor: pointer;
        :first-of-type {
            background-color: ${Colors.green};
            color: ${Colors.white};
            border: none;
            margin: 0;
        }
    }
`;
const Flavor = styled.p`
    font-weight: 600;
    font-size: 14px !important;
    margin-left: 16px;
    margin-top: 8px;
    padding: 0px 0px;
    cursor: pointer;
    :hover {
        color: ${Colors.green};
    }
`;

export default connect((state) => {
    return {
        cart: state.RapidOrderState.cart,
        store: state.Firestore.data.inventory.beverages,
        notes: state.RapidOrderState.notes,
        customer: state.RapidOrderState.customer,
    };
})(withFirestore(NewOrder));
