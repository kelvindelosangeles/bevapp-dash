import React, { useMemo } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Colors } from "../../Constants/Colors";
import { Button, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cancelOrder, removeFromCart, submitOrder } from "../../redux/actions/RapidOrderActions";
import { Delete } from "@material-ui/icons";
import { withFirestore } from "react-redux-firebase";

const Item = ({ data }) => {
    const dispatch = useDispatch();
    const customer = useSelector((state) => state.RapidOrderState.customer);

    let DisplayPrice = () => {
        try {
            return "$ " + parseFloat(customer.specialPrices[data.id].price).toFixed(2);
        } catch (err) {
            return "$ " + data.price;
        }
    };
    const removeItem = () => {
        if (window.confirm(`Delete ${data.id} ?`)) {
            dispatch(removeFromCart(data.id));
        }
    };

    const updateQuantity = () => {
        // FIXME: Move the logic to the actons
        dispatch({
            type: data.flavors ? "TOGGLE_ATCF" : "TOGGLE_ATC",
            item: data,
        });
    };

    return (
        <ItemComp>
            <div className='details'>
                <header>
                    {data.id} <span onClick={updateQuantity}>x {data.qty}</span>
                </header>
                <p>{data.description}</p>
            </div>
            <p className='price'>{DisplayPrice()}</p>
            <Delete onClick={removeItem} />
        </ItemComp>
    );
};

const MobileNewOrder = ({ firestore }) => {
    const { register, handleSubmit, watch, errors, reset } = useForm();
    const store = useSelector((state) => state.Firestore.data.inventory.beverages);
    const basket = useSelector((state) => state.RapidOrderState.cart);
    const customer = useSelector((state) => state.RapidOrderState.customer);
    const orderID = useSelector((state) => state.RapidOrderState.orderID);

    const dispatch = useDispatch();
    const submitHandler = (data) => {
        const ID = data.ID.toUpperCase();
        const qty = data.qty;
        const qtyInput = document.getElementById("qty");

        if (!store.hasOwnProperty(ID)) {
            // conditional checks if the item entered it correct
            window.alert("That item does not exist");
            return;
        }
        if (store[ID].hasOwnProperty("flavors")) {
            console.log("item has flavors");
            // FIXME: move this to actions
            dispatch({
                type: "TOGGLE_ATCF",
                item: store[ID],
            });
            reset();
            qtyInput.focus();
        } else {
            console.log("item does not have flavors");
            // FIXME: move this to actions
            dispatch(addToCart({ ...store[ID], qty }));
            reset();
            qtyInput.focus();
        }
    };

    // DEPRECATED VAR
    const createdAt = useMemo(() => {
        return `${new Date()}`;
    });
    // DEPRECATED VAR

    const submitOrderHandler = () => {
        const NewOrder = {
            customer,
            details: {
                new: true,
                complete: false,
                createdAt,
                createdBy: "General Admin",
                orderID,
                notes: "",
            },
            cart: basket,
            editedOrder: null,
        };
        // FIXEME: Move this function to actions
        return Object.values(basket).length < 1
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
                      dispatch(submitOrder());
                  })
                  .catch((err) => {
                      console.log(err);
                  });
    };

    const cancelOrderHandler = () => {
        window.confirm("Are you sure you want to cancel this order") && dispatch(cancelOrder());
    };

    return (
        <Component>
            <div className='basket'>
                <div className='basket-header'>
                    <p>Cart</p>
                    <p>{customer.address}</p>
                </div>
                {Object.values(basket).length < 1 && <p>Basket is Empty</p>}
                {Object.values(basket).map((a) => {
                    return <Item data={a} />;
                })}
                {Object.values(basket).length > 0 && (
                    <div className='order-actions'>
                        <Button onClick={submitOrderHandler}>Submit Order</Button>
                        <Button onClick={cancelOrderHandler}>Cancel Order</Button>
                    </div>
                )}
            </div>
            <div className='control-center'>
                <div className='heading'>Order Entry </div>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <input pattern='\d*' id='qty' type='num' name='qty' min={1} max={99} maxLength={2} ref={register({ required: true })} />
                    <input type='text' name='ID' maxLength={8} ref={register({ required: true })} />
                    <Button type='submit'>Add Item</Button>
                </form>
            </div>
        </Component>
    );
};

const Component = styled.div`
    .control-center {
        padding: 12px;
        position: fixed;
        bottom: 0;
        background-color: white;
        width: 100vw;
        .heading {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 12px;
            text-align: center;
        }
        form {
            display: grid;
            grid-template-columns: 50px 100px 1fr;
            grid-column-gap: 24px;
            input {
                border: 1px solid ${Colors.grey};
                height: 40px;
                font-size: 16px;
                padding: 0 8px;
                border-radius: 4px;
                font-weight: 600;
                text-transform: uppercase;

                outline: none;
            }
            button {
                background-color: black;
                color: white;
                font-size: 12px;
            }
        }
    }
    .basket {
        display: grid;
        grid-row-gap: 12px;
        padding: 12px;
        background-color: ${Colors.lightGrey};
        min-height: 100vh;
        padding-bottom: 132px;
        align-content: flex-start;
        .basket-header {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 24px;
            display: grid;
            justify-content: space-between;
            grid-template-columns: min-content 1fr;
            grid-column-gap: 24px;
            justify-items: flex-end;
        }
        .order-actions {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-column-gap: 40px;
            button {
                height: 50px;
                :first-of-type {
                    background-color: ${Colors.green};
                    color: white;
                }
                :last-of-type {
                    background-color: ${Colors.red};
                    color: white;
                }
            }
        }
    }
    @media (min-width: 768px) {
        display: none;
    }
`;

const ItemComp = styled(Paper)`
    display: grid;
    grid-template-columns: repeat(2, 1fr) min-content;
    align-items: center;
    grid-column-gap: 16px;
    padding: 12px;
    border-radius: 8px;
    background-color: ${Colors.white};
    .details {
        header {
            font-size: 16px;
            font-weight: 600;
            text-transform: uppercase;
            span {
                margin-left: 8px;
                font-size: 14px;
                text-transform: lowercase;
            }
        }
        p {
            font-size: 14px;
            color: ${Colors.grey};
        }
    }
    .price {
        justify-self: flex-end;
        font-size: 14px;
        font-weight: 600;
    }
    svg {
        color: ${Colors.red};
    }
`;
export default withFirestore(MobileNewOrder);

// FIXME:
// Add firectore connect hook

// TODO:
// Use snacks for successfull and rejected item additions
// Enable adding notes Features
// Start renaming cart to basket
