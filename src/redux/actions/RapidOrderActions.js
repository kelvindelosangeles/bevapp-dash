import moment from "moment";
import uuid from "uuid";

export const newOrder = (customer) => {
    // console.log(customer);
    return (dispatch, getState) => {
        dispatch({
            type: "NEW_ORDER",
            payload: {
                customer,
                orderID: (moment(new Date()).format("YYMMDD") + uuid().slice(0, 8) + "ga").toUpperCase(),
            },
        });
    };
};
export const editOrder = (order, history) => {
    return (dispatch, getState) => {
        // define the rapid order cart
        let rapidOrderCart = Object.values(getState().RapidOrderState.cart);
        // define the rapid order customer
        let rapidOrderCustomer = getState().RapidOrderState.customer;
        // Run a check and dont allow the user to edit an order if the cart is not empty or the rapid order contains a customer.  all should be cleared
        rapidOrderCart.length > 0 || rapidOrderCustomer
            ? window.alert("Rapid Order Is currently in use.  Please complete the Rapid Order before trying to Edit")
            : dispatch({
                  type: "EDIT_ORDER",
                  payload: order,
              }) && history.push("/rapidorder");
    };
};
export const cancelOrder = () => {
    return (dispatch, getState) => {
        console.log("cancle is initiated");
        window.confirm("Are you sure you want to cancel this order") &&
            dispatch({
                type: "CANCEL_ORDER",
            });
    };
};
export const deleteOrder = (order, firestore, closeOrderPreview) => {
    return (dispatch, getState) => {
        const { orderID } = order.details;
        const dashboardOrders = getState().Firestore.data.ordersv2.orders;
        // destructure the order id out of the orders object to set
        const { [orderID]: deleted, ...rest } = dashboardOrders;
        // add the order to the deleted orders collection, upon success then remove the order from the orders collection
        const deleteFromFirestore = () => {
            firestore
                .set({ collection: "deletedOrders", doc: orderID }, order)
                .then(() => {
                    console.log("successfully added to the deleted orders collection");
                    firestore
                        .set(
                            {
                                collection: "ordersv2",
                                doc: "orders",
                            },
                            rest
                        )
                        .then(() => {
                            console.log("successfully deleted");
                            // close the order menu once deleted
                            closeOrderPreview();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        window.confirm(`Are you sure you want to delete for ${order.customer.address}`) &&
            window.confirm("This action is irreversible, Delete anyway?") &&
            deleteFromFirestore();
    };
};

// OrderID Formula
// (moment(new Date()).format("YYMMDD") + uuid().slice(0, 8) + "ga").toUpperCase()
