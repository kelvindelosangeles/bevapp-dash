import moment from "moment";
import uuid from "uuid";
import store from "store";

export const newOrder = (customer) => {
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
        const { orderID } = getState().RapidOrderState;
        store.remove(orderID);
        dispatch({
            type: "CANCEL_ORDER",
        });
    };
};
export const deleteOrder = (order, firestore, closeOrderPreview) => {
    return (dispatch, getState) => {
        const dashboardOrders = getState().Firestore.data.ordersv2.orders;
        const routes = getState().Firestore.data.routes.routes;
        const allRoutes = Object.values(routes)
            .map((x) => x.orders)
            .flat();
        // destructure the order id out of the orders object to set
        const { [order.details.orderID]: deleted, ...rest } = dashboardOrders;
        // document Ref
        const dashboardOrdersRef = firestore.collection("ordersv2").doc("orders");
        // confirm twice before deleting
        window.confirm("Are you sure want to delete this order") &&
            window.confirm("This action is irreversible") &&
            // firestore Transaction
            firestore
                .runTransaction((t) => {
                    // read the dashboard orders before running the transaction
                    return t.get(dashboardOrdersRef).then((res) => {
                        // List of Transactions
                        // write the deleted order to the deletedordersv2 collection
                        t.set(firestore.collection("deletedOrdersv2").doc(order.details.orderID), order);
                        // set the dashboard orders list to the orders list excluding the deleted order
                        t.set(dashboardOrdersRef, rest);
                        // run a check to see if that order is assigned, if it is then delete that order from route
                        Object.values(routes).forEach((x) => {
                            x.orders.includes(order.details.orderID) &&
                                t.update(firestore.collection("routes").doc("routes"), {
                                    // returns the route with  a new order list filtering out the deleted order
                                    [x.details.routeID]: { ...x, orders: x.orders.filter((a) => a !== order.details.orderID) },
                                });
                            // TODO:100 potentially add another check to see if the route has only one DataTransferItem, if it does delete the entire route
                        });
                    });
                })
                .then(() => {
                    console.log("transaction was successful");
                    closeOrderPreview();
                })
                .catch((err) => {
                    console.log(err);
                    console.log("Transaction not successful");
                });
    };
};
export const saveToDrafts = (firestore) => {
    return (dispatch, getState) => {
        const { cart, orderID, customer, notes } = getState().RapidOrderState;
        const NewOrder = {
            customer,
            details: {
                new: true,
                complete: false,
                createdAt: new Date(),
                createdBy: "General Admin",
                orderID,
                notes,
            },
            cart,
            editedOrder: null,
        };
        // check that the cart isnt empty when saving a draft
        if (Object.values(cart).length < 1) {
            return alert("An empty order cannot be saved as a draft");
        }
        store.set(orderID, NewOrder);
        dispatch({
            type: "SAVE_TO_DRAFTS",
        });
    };
};
export const addToCart = (item) => {
    // FIXME:CLEAN UP, this is a combination of old actions and new actions in one
    return (dispatch, getState) => {
        const { cart, orderID, customer, notes, editMode } = getState().RapidOrderState;
        // check that the cart isnt empty when saving a draft
        const NewOrder = {
            customer,
            details: {
                new: true,
                complete: false,
                createdAt: new Date(),
                createdBy: "General Admin",
                orderID,
                notes,
            },
            // add the item before the dispatch or else it would be behind
            cart: { ...cart, [item.id]: item },
            editedOrder: null,
        };

        !editMode && store.set(orderID, NewOrder);
        dispatch({
            type: "ADD_TO_CART",
            item: item,
        });
    };
};
export const removeFromCart = (id) => {
    // FIXME:CLEAN UP, this is a combination of old actions and new actions in one
    return (dispatch, getState) => {
        const { cart, orderID, customer, notes, editMode } = getState().RapidOrderState;
        const { [id]: removed, ...items } = cart;

        // Recreate the order to send to LS
        const Order = {
            customer,
            details: {
                new: true,
                complete: false,
                createdAt: new Date(),
                createdBy: "General Admin",
                orderID,
                notes,
            },
            // add the item before the dispatch or else it would be behind
            cart: { ...items },
            editedOrder: null,
        };
        // if edit mode is on, do not persist to local storage
        !editMode && store.set(orderID, Order);
        // if the cart becomes empty delete the draft
        Object.values(items).length < 1 && store.remove(orderID);

        dispatch({
            type: "REMOVE_FROM_CART",
            id,
        });
    };
};
export const updateCustomer = (newCustomer) => {
    // FIXME:CLEAN UP, this is a combination of old actions and new actions in one
    return (dispatch, getState) => {
        const { cart, orderID, notes, editMode } = getState().RapidOrderState;

        // Recreate the order to send to LS
        const Order = {
            customer: newCustomer,
            details: {
                new: true,
                complete: false,
                createdAt: new Date(),
                createdBy: "General Admin",
                orderID,
                notes,
            },
            // add the item before the dispatch or else it would be behind
            cart,
            editedOrder: null,
        };
        //  Dont interacti with LS if Editmode is on
        !editMode && Object.values(cart).length > 0 && store.set(orderID, Order);

        dispatch({
            type: "UPDATE_CUSTOMER",
            customer: newCustomer,
        });
    };
};
export const submitOrder = () => {
    return (dispatch, getState) => {
        const { cart, orderID, editMode } = getState().RapidOrderState;
        // conditons must be met, not in edit mode and cart length is greater than 0
        !editMode && Object.values(cart).length > 0 && store.remove(orderID);
        dispatch({
            type: "SUBMIT_ORDER",
        });
    };
};
