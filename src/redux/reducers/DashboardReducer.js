import { Order } from "../../Models/Order";

const initialState = {
    activeOrder: null,
};

const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TEST_ACTION":
            console.log(action.payload);
        case "SUBMIT_ORDER":
            return {
                ...state,
                activeOrder: null,
            };

        case "CLEAR_ORDER":
            return {
                ...state,
                activeOrder: null,
            };
        case "SET_ACTIVE_ORDER":
            return { ...state, activeOrder: { ...action.order } };
        case "CLEAR_ACTIVE_ORDER":
            return {
                ...state,
                activeOrder: null,
            };
        case "DELETE_ORDER":
            return {
                ...state,
                activeOrder: null,
            };
        case "CREATE_ROUTE":
            console.log("Route created - Via Reducer");
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default DashboardReducer;
