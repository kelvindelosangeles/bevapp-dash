const initialState = {
    atcVisible: false,
    atcfVisible: false,
    customer: null,
    orderItem: {},
    notes: "",
    // cart: {
    //   "A&W2LI": {
    //     brand: "A&W",
    //     id: "A&W2LI",
    //     category: "soda",
    //     description: "A&W 2liter bottle",
    //     packaging: "bottle",
    //     size: "2liter",
    //     price: "9.69",
    //     qty: 1
    //   },
    //   AMS12P: {
    //     brand: "Amstel Lite",
    //     id: "AMS12P",
    //     category: "beer",
    //     description: "Amstel Lite 12oz bottle 12pk",
    //     packaging: "bottle",
    //     size: "12oz",
    //     price: "32.65",
    //     qty: 1
    //   },
    //   AMS12B: {
    //     brand: "Amstel Lite",
    //     id: "AMS12B",
    //     category: "beer",
    //     description: "Amstel Lite 12oz bottle",
    //     packaging: "bottle",
    //     size: "12oz",
    //     price: "33.95",
    //     qty: 1
    //   },
    //   ALO16B: {
    //     brand: "Aloevine",
    //     id: "ALO16B",
    //     category: "juice",
    //     description: "Aloevine 16oz bottle",
    //     packaging: "bottle",
    //     size: "16oz",
    //     price: "16.95",
    //     qty: 1
    //   },
    //   "ALO1.5": {
    //     brand: "Aloe",
    //     id: "ALO1.5",
    //     category: "juice",
    //     description: "Aloe 1.5liter bottle",
    //     packaging: "bottle",
    //     size: "1.5liter",
    //     price: "21.95",
    //     qty: 1
    //   },
    //   "7UP2LI": {
    //     brand: "7UP",
    //     category: "soda",
    //     description: "7up 2liter bottle",
    //     id: "7UP2LI",
    //     packaging: "bottle",
    //     price: "9.95",
    //     size: "2liter",
    //     qty: "23"
    //   },
    //   "7UP20B": {
    //     brand: "7UP",
    //     category: "soda",
    //     description: "7UP 20oz bottle",
    //     id: "7UP20B",
    //     packaging: "bottle",
    //     price: "19.99",
    //     size: "20oz",
    //     qty: "34"
    //   }
    // }
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
