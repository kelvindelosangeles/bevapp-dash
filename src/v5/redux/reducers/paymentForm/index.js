const initialState = {
    open: false,
    route: null,
    order: null,
};

export const paymentForm = (state = initialState, action) => {
    switch (action.type) {
        case "OPEN_PAYMENT_FORM":
            const { route, order } = action.payload;
            // opens the modal and adds the order and route to state
            return {
                ...state,
                open: true,
                route,
                order,
            };
        case "CLOSE_PAYMENT_FORM":
            // reset the form
            return initialState;
        default:
            return state;
    }
};
