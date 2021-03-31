import moment from "moment-timezone";
import uuid from "uuid";
import store from "store";
import underscore from "underscore";

export const completeRoute = (route, firestore, setOpen) => {
    // TODO: Add logic so that a route cannot be recreated
    // Extract the route ID from the route details.
    const { routeID } = route.details;
    // Extract the route date from the route details.
    const { routeDate } = route.details.dates;
    // the week document is where all routes created that day are stored and is created from the routedate property in details
    const weekDocument = moment(routeDate.date).format("YYYYMMwE");
    return (dispatch, getState) => {
        // grab the orders from the dashboard to build the complete routes object
        // grab the routes from the db to build an updated list
        const now = moment().valueOf();
        const timezone = moment.tz.guess();
        const orders = getState().Firestore.data.ordersv2.orders;
        const allRoutes = getState().Firestore.data.routes.routes;
        const updatedOrders = underscore.omit(orders, route.orders);
        const updatedRoutes = underscore.omit(allRoutes, routeID);
        const completedRoute = () => {
            // commented out on march 31st
            // create an obj with all of the routes orders in full from the routes order array
            // let obj = {};
            // route.orders.forEach((x) => {
            //     Object.assign(obj, { [x]: orders[x] });
            // });

            // using an array instead of an object to maintain sequence
            let arrayOfOrders = [];
            route.orders.map((a) => {
                arrayOfOrders.push(orders[a]);
            });
            // after creating the orders object return a completed route obj
            return {
                [routeID]: {
                    ...route,
                    details: {
                        ...route.details,
                        dates: { ...route.details.dates, completedAt: { date: now, tz: timezone } },
                        completedAt: new Date(),
                    },
                    orders: arrayOfOrders,
                },
            };
        };
        setOpen(false);

        const docRef = firestore.collection("ordersv2").doc(weekDocument);
        window.confirm("Are you sure you want to complete this route?");
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
