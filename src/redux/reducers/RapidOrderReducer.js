import store from "store";

const initialState = {
    atcVisible: false,
    atcfVisible: false,
    orderID: null,
    customer: null,
    cart: {},
    notes: "",
    orderItem: {},
    editMode: false,
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
        case "SUBMIT_ORDER":
            return {
                ...state,
                cart: {},
                notes: "",
                customer: null,
            };

        case "REMOVE_ITEM":
            const { [action.id]: removed, ...items } = state.cart;
            store.set("cart", { ...items });
            return {
                ...state,
                cart: { ...items },
            };

        case "SET_CUSTOMER":
            return {
                ...state,
                customer: action.customer,
            };
        case "SET_NOTE":
            return {
                ...state,
                notes: action.payload,
            };
        // ===============
        // V2 Actions
        // remove all actions above
        // Coming from Action Creators
        // ===============
        case "NEW_ORDER":
            return {
                ...state,
                customer: action.payload.customer,
                orderID: action.payload.orderID,
            };
        case "EDIT_ORDER":
            // recieves the order to edit as a payload
            return {
                ...state,
                customer: action.payload.customer,
                notes: action.payload.details.notes,
                cart: action.payload.cart,
                orderID: action.payload.details.orderID,
                editMode: true,
            };
        case "CANCEL_ORDER":
            return initialState;
        default:
            return state;
    }
};

export default RapidOrderReducer;
