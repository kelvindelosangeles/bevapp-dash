const initialState = {
    atcVisible: false,
    atcfVisible: false,
    customer: null,
    orderItem: {},
    notes: "",
    cart: {},
    // beta
    editOrderID: null,
};

const RapidOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_ATC":
            return {
                ...state,
                atcVisible: !state.atcVisible,
                orderItem: { ...action.item },
            };
        case "TOGGLE_ATCF":
            return {
                ...state,
                atcfVisible: !state.atcVisible,
                orderItem: { ...action.item },
            };

        case "CLOSE_ATC":
            return {
                ...state,
                atcVisible: false,
                atcfVisible: false,
                orderItem: {},
            };
        case "ADD_TO_CART":
            return {
                ...state,
                atcVisible: false,
                atcfVisible: false,
                cart: { ...state.cart, [action.item.id]: action.item },
            };
        case "CANCEL_ORDER":
            return {
                ...state,
                cart: {},
                customer: null,
                notes: "",
                editOrderID: null,
            };
        case "SUBMIT_ORDER":
            return {
                ...state,
                cart: {},
                notes: "",
                editOrderID: null,
                customer: null,
            };

        case "REMOVE_ITEM":
            // destructure to remove a key from an object
            const { [action.id]: removed, ...items } = state.cart;
            return {
                ...state,
                cart: { ...items },
            };

        case "SET_CUSTOMER":
            return {
                ...state,
                customer: action.customer,
                editOrderID: null,
            };
        case "SET_NOTE":
            return {
                ...state,
                notes: action.payload,
            };
        // BETA
        case "SET_EDIT_ORDER_CART":
            return {
                ...state,
                customer: action.payload.customer,
                cart: action.payload.cart,
                editOrderID: action.payload.orderID,
            };
        // case "TEST_ACTION":
        //     return state;
        default:
            return state;
    }
};

export default RapidOrderReducer;
