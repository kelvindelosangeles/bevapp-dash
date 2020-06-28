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
        case "ADD_TO_CART":
            return {
                ...state,
                atcVisible: false,
                atcfVisible: false,
                cart: { ...state.cart, [action.item.id]: action.item },
            };
        case "REMOVE_FROM_CART":
            const { [action.id]: removed, ...items } = state.cart;
            return {
                ...state,
                cart: { ...items },
            };
        case "UPDATE_CUSTOMER":
            return {
                ...state,
                customer: action.customer,
            };
        case "CANCEL_ORDER":
            return initialState;
        case "SUBMIT_ORDER":
            return initialState;

        case "SAVE_TO_DRAFTS":
            return initialState;
        case "EDIT_ORDER":
            return {
                ...state,
                customer: action.payload.customer,
                notes: action.payload.details.notes,
                cart: action.payload.cart,
                orderID: action.payload.details.orderID,
                editMode: true,
            };
        default:
            return state;
    }
};

export default RapidOrderReducer;
