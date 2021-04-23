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

export const submitPayment = (data) => (dispatch, getState) => {
    const state = getState().PaymentForm;

    console.log(state);
    console.log(data);
};

const submitPaymentHandler = (data) => {
    const { priceAdjustment, breakage, returnedContainers, returnedToFlair, cash, check, notes, sign } = data;
    // checks if its signed return everything empty and sign true, else sign false and other fields available for entry
    const payment = sign
        ? {
              createdAt: moment().valueOf(),
              createdBy: "General Admin",
              sign,
              credits: {
                  priceAdjustment: 0.0,
                  breakage: 0.0,
                  returnedContainers: 0.0,
                  returnedToFlair: 0.0,
              },
              payments: {
                  cash: 0.0,
                  check: 0.0,
              },
              notes,
              totalCredit,
              totalPayment,
          }
        : {
              createdAt: moment().valueOf(),
              createdBy: "General Admin",
              sign,
              credits: {
                  priceAdjustment,
                  breakage,
                  returnedContainers,
                  returnedToFlair,
              },
              payments: {
                  cash,
                  check,
              },
              notes,
              totalCredit,
              totalPayment,
          };

    const updatedRouteForObjects = {
        [parentRoute.details.routeID]: {
            ...parentRoute,
            orders: {
                ...parentRoute.orders,
                [order.details.orderID]: {
                    ...order,
                    payment,
                },
            },
        },
    };
    const updatedRouteForArrays = () => {
        const routeExcludingOldVersion = parentRoute.orders.filter((a) => {
            return a.details.orderID !== order.details.orderID;
        });

        return {
            [parentRoute.details.routeID]: {
                ...parentRoute,
                orders: [...routeExcludingOldVersion, { ...order, payment }],
            },
        };
    };

    const temporaryFunctionDecider = () => {
        // console.log("original parent route with orders", parentRoute);
        return Array.isArray(parentRoute.orders) ? updatedRouteForArrays() : updatedRouteForObjects;
    };

    // console.log(Array.isArray(parentRoute.orders), temporaryFunctionDecider());

    firestore
        .update(
            {
                collection: "ordersv2",
                doc: weekDocumentID,
            },
            temporaryFunctionDecider()
        )
        .then(() => {
            console.log("successfully paid");
            setOpenPayment(false);
            history.push("/completedorders");
            // TODO: BETA: View Order and completedOrder For details on this additon
            getCompletedOrders();
        })
        .catch((err) => {
            console.log(err, "something went wrong with the payment update process");
        });
};
