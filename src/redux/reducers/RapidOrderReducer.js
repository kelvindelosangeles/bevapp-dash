const initialState = {
    atcVisible: false,
    atcfVisible: false,
    customer: null,
    orderItem: {},
    notes: "",
    cart: {}
};

const RapidOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_ATC":
            return {
                ...state,
                atcVisible: !state.atcVisible,
                orderItem: { ...action.item }
            };
        case "TOGGLE_ATCF":
            return {
                ...state,
                atcfVisible: !state.atcVisible,
                orderItem: { ...action.item }
            };

        case "CLOSE_ATC":
            return {
                ...state,
                atcVisible: false,
                atcfVisible: false,
                orderItem: {}
            };
        case "ADD_TO_CART":
            return {
                ...state,
                atcVisible: false,
                atcfVisible: false,
                cart: { ...state.cart, [action.item.id]: action.item }
            };
        case "CANCEL_ORDER":
            return {
                ...state,
                cart: {},
                editMode: false,
                customer: null,
                orderToEdit: {},
                notes: ""
            };
        case "SUBMIT_ORDER":
            return {
                ...state,
                cart: {},
                notes: ""
            };

        case "REMOVE_ITEM":
            // destructure to remove a key from an object
            const { [action.id]: removed, ...items } = state.cart;
            return {
                ...state,
                cart: { ...items }
            };

        case "SET_CUSTOMER":
            return {
                ...state,
                customer: action.customer
            };
        case "SET_NOTE":
            return {
                ...state,
                notes: action.payload
            };
        default:
            return state;
    }
};

export default RapidOrderReducer;
