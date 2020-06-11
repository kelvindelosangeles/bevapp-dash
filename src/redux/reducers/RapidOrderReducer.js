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
        // case "POPULATE_CACHE":
        //     return {
        //         ...state,
        //         customer: action.payload.customer,
        //         cart: action.payload.cart,
        //         editOrderID: action.payload.editOrderID,
        //     };
        // TODO: Remove this action from rapid order
        case "ADD_TO_CART":
            store.set("cart", { ...state.cart, [action.item.id]: action.item });
            return {
                ...state,
                atcVisible: false,
                atcfVisible: false,
                cart: { ...state.cart, [action.item.id]: action.item },
            };
        case "CANCEL_ORDER":
            store.set("cart", {});
            store.set("customer", null);
            store.set("editOrderID", null);
            return {
                ...state,
                cart: {},
                customer: null,
                notes: "",
                editOrderID: null,
            };
        case "SUBMIT_ORDER":
            store.set("cart", {});
            store.set("customer", null);
            store.set("editOrderID", null);
            return {
                ...state,
                cart: {},
                notes: "",
                editOrderID: null,
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
            store.set("customer", action.customer);
            store.set("editOrderID", null);
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
            store.set("cart", action.payload.cart);
            store.set("customer", action.payload.customer);
            store.set("editOrderID", action.payload.orderID);

            return {
                ...state,
                customer: action.payload.customer,
                cart: action.payload.cart,
                editOrderID: action.payload.orderID,
            };
        // ===============
        // V2 Actions
        // remove all actions above
        // ===============
        case "EDIT_ORDER":
            // recieves the order to edit as a payload
            const { customer, details, cart } = action.payload;
            return {
                customer,
                notes: details.notes,
                cart,
                orderID: details.orderID,
                editMode: true,
            };
        default:
            return state;
    }
};

export default RapidOrderReducer;
