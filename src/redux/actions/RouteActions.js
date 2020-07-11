import moment from "moment";
import uuid from "uuid";
import store from "store";
import underscore from "underscore";

export const completeRoute = (route, firestore, setOpen) => {
    // TODO: Add logic so that a route cannot be recreated
    // function gets the route and extracts the route ID
    const { routeID } = route.details;
    // the week document is where all routes created that day are stored
    const weekDocument = moment(new Date()).format("YYYYMMwE");
    return (dispatch, getState) => {
        // grab the orders from the dashboard to build the complete routes object
        // grab the routes from the db to build an updated list
        const orders = getState().Firestore.data.ordersv2.orders;
        const allRoutes = getState().Firestore.data.routes.routes;
        const updatedOrders = underscore.omit(orders, route.orders);
        const updatedRoutes = underscore.omit(allRoutes, routeID);
        const completedRoute = () => {
            // create an obj with all of the routes orders in full from the routes order array
            let obj = {};
            route.orders.forEach((x) => {
                Object.assign(obj, { [x]: orders[x] });
            });
            // after creating the orders object return a completed route obj
            return {
                [routeID]: {
                    ...route,
                    details: { ...route.details, completedAt: new Date() },
                    orders: obj,
                },
            };
        };
        setOpen(false);

        const docRef = firestore.collection("ordersv2").doc(weekDocument);
        window.confirm("Are you sure you want to complete this route?") &&
            firestore
                .runTransaction((t) => {
                    return t.get(docRef).then((doc) => {
                        doc.exists
                            ? t.update(firestore.collection("ordersv2").doc(weekDocument), completedRoute())
                            : t.set(firestore.collection("ordersv2").doc(weekDocument), completedRoute());

                        t.set(firestore.collection("ordersv2").doc("orders"), updatedOrders);
                        t.set(firestore.collection("routes").doc("routes"), updatedRoutes);
                    });
                })
                .then(() => {
                    console.log("transaction Successful");
                })
                .catch((err) => {
                    window.alert("Error Completing Route");
                    console.log("Transaction Failed");
                    console.log(err);
                });
    };
};
