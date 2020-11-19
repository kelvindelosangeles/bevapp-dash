import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import NewOrder from "../../../Rapid Order/Components/NewOrder/NewOrder";
import MobileNewOrder from "../../../../componentsv3/mobile new order/index";
import { withFirestore } from "react-redux-firebase";
import { connect } from "formik";

const ResponsiveRouter = () => {
    const open = useSelector((state) => state.GlobalState.drawerOpen);
    const [smartEntryID, setSmartEntryID] = useState("");
    const [smartEntryQty, setSmartEntryQty] = useState("");
    const orderID = useSelector((state) => state.RapidOrderState.orderID);
    // Component state and requirements

    const CartArray = Object.values(cart).map((i) => {
        const removeItem = () => {
            if (window.confirm(`Delete ${i.id} ?`)) {
                triggerSnack("error", `Deleted Item ${i.id}`);
                dispatch(removeFromCart(i.id));
                // dispatch({
                //     type: "REMOVE_ITEM",
                //     id: i.id,
                // });
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
    const createdAt = useMemo(() => {
        return `${new Date()}`;
    });

    const submitHandler = () => {
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
                      dispatch(submitOrder());
                  })
                  .catch((err) => {
                      console.log(err);
                  });
    };
    const customerChangeHandler = (e, value) => {
        return value === null
            ? window.confirm("Are you sure you want to cancel this order?") && dispatch(cancelOrder())
            : dispatch(updateCustomer(value));
    };
    // Functions Carried over from the Web version of New Order

    return (
        <Component>
            <MobileNewOrder />
            <NewOrder />
        </Component>
    );
};
const Component = styled.div``;
export default connect((state) => {
    return {
        cart: state.RapidOrderState.cart,
        store: state.Firestore.data.inventory.beverages,
        notes: state.RapidOrderState.notes,
        customer: state.RapidOrderState.customer,
    };
})(withFirestore(ResponsiveRouter));
// FIXME: Refactor with hooks
