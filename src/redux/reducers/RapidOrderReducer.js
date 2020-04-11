const initialState = {
    atcVisible: false,
    atcfVisible: false,
    customer: {
        firstLetter: "0-9",
        active: true,
        address: "1101 garrison ave",
        city: "bx",
        cr: "bb",
        id: "01e081c0",
        name: "four star deli grocery",
        sla: "1139579",
        telephone: "7186175624",
    },
    orderItem: {},
    notes: "",
    cart: {
        "7UP2LI": {
            brand: "7UP",
            category: "soda",
            description: "7up 2liter bottle",
            id: "7UP2LI",
            packaging: "bottle",
            price: "9.95",
            qty: "1",
            size: "2liter",
        },
        BUD36C: {
            brand: "Budweiser",
            category: "beer",
            description: "Budweiser 12oz can 36pk",
            id: "BUD36C",
            packaging: "can",
            price: "24.95",
            qty: "1",
            size: "12oz",
        },
        COK12B: {
            brand: "Coke",
            category: "soda",
            description: "Coke 12oz bottle",
            id: "COK12B",
            packaging: "bottle",
            price: "20.95",
            qty: "1",
            size: "12oz",
        },
        COK2LI: {
            brand: "Coke",
            category: "soda",
            description: "Coke 2liter bottle",
            id: "COK2LI",
            packaging: "bottle",
            price: "12.99",
            qty: "1",
            size: "2liter",
        },
        COO24C: {
            brand: "Coors",
            category: "beer",
            description: "Coors 24oz can",
            id: "COO24C",
            packaging: "can",
            price: "16.49",
            qty: "4",
            size: "24oz",
        },
        COR12B: {
            brand: "Corona Extra",
            category: "beer",
            description: "Corona Extra 12oz bottle",
            id: "COR12B",
            packaging: "bottle",
            price: "32.49",
            qty: "6",
            size: "12oz",
        },
        COR22B: {
            brand: "Corona Extra",
            category: "beer",
            description: "Corona Extra 22oz bottle",
            id: "COR22B",
            packaging: "bottle",
            price: "30.89",
            qty: "1",
            size: "22oz",
        },
        COX24C: {
            brand: "Coors Lite",
            category: "beer",
            description: "Coors Lite 24oz can",
            id: "COX24C",
            packaging: "can",
            price: "21.95",
            qty: "2",
            size: "24oz",
        },
        COX36C: {
            brand: "Coors Lite",
            category: "beer",
            description: "Coors Lite 12oz can 36pk",
            id: "COX36C",
            packaging: "can",
            price: "14.95",
            qty: "5",
            size: "12oz",
        },
        MOS12B: {
            brand: "Modelo Especial",
            category: "beer",
            description: "Modelo Especial 12oz bottle",
            id: "MOS12B",
            packaging: "bottle",
            price: "33.39",
            qty: "4",
            size: "12oz",
        },
        NAX30C: {
            brand: "Natural Lite",
            category: "beer",
            description: "Natural Lite 12oz can 30pk",
            id: "NAX30C",
            packaging: "can",
            price: "18.99",
            qty: "1",
            size: "12oz",
        },
        NUT12C: {
            brand: "Nutrament",
            category: "dairy",
            description: "Nutrament 12oz can",
            id: "NUT12C",
            packaging: "can",
            price: "17.89",
            qty: "1",
            size: "12oz",
        },
        STE12B: {
            brand: "Stella Artois",
            category: "beer",
            description: "Stella Artois 12oz bottle",
            id: "STE12B",
            packaging: "bottle",
            price: "35.89",
            qty: "1",
            size: "12oz",
        },
        SUN2LI: {
            brand: "Sunkist",
            category: "soda",
            description: "Sunkist 2liter",
            id: "SUN2LI",
            packaging: "bottle",
            price: "9.89",
            qty: "1",
            size: "2liter",
        },
    },
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
        default:
            return state;
    }
};

export default RapidOrderReducer;
