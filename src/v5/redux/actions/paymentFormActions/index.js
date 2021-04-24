import moment from "moment-timezone";
import { paymentForm } from "../../reducers/paymentForm";

export const openPaymentForm = (route, order) => (dispatch) => {
    dispatch({
        type: "OPEN_PAYMENT_FORM",
        payload: {
            route: route,
            order: order,
        },
    });
};
export const closePaymentForm = () => (dispatch) => {
    dispatch({
        type: "CLOSE_PAYMENT_FORM",
    });
};
export const postPayment = (data, totalPayment, totalCredit, firestore) => (dispatch, getState) => {
    const { cash, check, breakage, priceAdjustment, returnedContainers, returnedToFlair, notes } = data;
    const route = getState().PaymentForm.route;
    const order = getState().PaymentForm.order;
    const orderHasPayment = Boolean(order.payment);
    const createdAt = orderHasPayment ? order.payment.createdAt : moment().valueOf();
    const weekDocument = () => {
        try {
            return moment(route.details.dates.routeDate.date).format("YYYYMMwE");
        } catch (error) {
            return moment(route.details.createdAt).format("YYYYMMwE");
        }
    };
    const payment = {
        createdAt,
        createdBy: "General Admin",
        notes,
        sign: false,
        totalCredit: String(totalCredit),
        totalPayment: String(totalPayment),
        credits: {
            breakage,
            priceAdjustment,
            returnedContainers,
            returnedToFlair,
        },
        payments: {
            cash,
            check,
        },
    };

    const updatedRouteForObjects = {
        [route.details.routeID]: {
            ...route,
            orders: {
                ...route.orders,
                [order.details.orderID]: {
                    ...order,
                    payment,
                },
            },
        },
    };
    const updatedRouteForArrays = () => {
        const routeExcludingOldVersion = route.orders.filter((a) => {
            return a.details.orderID !== order.details.orderID;
        });

        return {
            [route.details.routeID]: {
                ...route,
                orders: [...routeExcludingOldVersion, { ...order, payment }],
            },
        };
    };
    const temporaryFunctionDecider = () => {
        // console.log("original parent route with orders", parentRoute);
        return Array.isArray(route.orders) ? updatedRouteForArrays() : updatedRouteForObjects;
    };

    const postToFirebase = () => {
        try {
            firestore
                .update(
                    {
                        collection: "ordersv2",
                        doc: weekDocument(),
                    },
                    temporaryFunctionDecider()
                )
                .then(() => {
                    console.log("successfully paid");
                    dispatch({
                        type: "POST_PAYMENT",
                    });
                })
                .catch((err) => {
                    console.log(err, "something went wrong with the payment update process");
                });
        } catch (error) {
            console.log(error);
            window.alert("an error occured, contact admin");
        }
    };

    postToFirebase();
};
export const signPayment = (notes, firestore) => (dispatch, getState) => {
    const route = getState().PaymentForm.route;
    const order = getState().PaymentForm.order;
    const orderHasPayment = Boolean(order.payment);
    const createdAt = orderHasPayment ? order.payment.createdAt : moment().valueOf();
    const weekDocument = () => {
        try {
            return moment(route.details.dates.routeDate.date).format("YYYYMMwE");
        } catch (error) {
            return moment(route.details.createdAt).format("YYYYMMwE");
        }
    };
    const payment = {
        createdAt,
        createdBy: "General Admin",
        notes,
        sign: true,
        totalCredit: "0.00",
        totalPayment: "0.00",
        credits: {
            breakage: "",
            priceAdjustment: "",
            returnedContainers: "",
            returnedToFlair: "",
        },
        payments: {
            cash: "",
            check: "",
        },
    };

    const updatedRouteForObjects = {
        [route.details.routeID]: {
            ...route,
            orders: {
                ...route.orders,
                [order.details.orderID]: {
                    ...order,
                    payment,
                },
            },
        },
    };
    const updatedRouteForArrays = () => {
        const routeExcludingOldVersion = route.orders.filter((a) => {
            return a.details.orderID !== order.details.orderID;
        });

        return {
            [route.details.routeID]: {
                ...route,
                orders: [...routeExcludingOldVersion, { ...order, payment }],
            },
        };
    };
    const temporaryFunctionDecider = () => {
        // console.log("original parent route with orders", parentRoute);
        return Array.isArray(route.orders) ? updatedRouteForArrays() : updatedRouteForObjects;
    };

    firestore
        .update(
            {
                collection: "ordersv2",
                doc: weekDocument(),
            },
            temporaryFunctionDecider()
        )
        .then(() => {
            console.log("successfully signed payment");
            dispatch({
                type: "SIGN_PAYMENT",
            });
        })
        .catch((err) => {
            console.log(err, "something went wrong with the payment update process");
        });
};

// TODO: When the user updates a payment it shouldnt change the created date
