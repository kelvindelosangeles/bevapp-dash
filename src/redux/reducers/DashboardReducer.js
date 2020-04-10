import { Order } from "../../Models/Order";

const initialState = {
    activeOrder: null,
};

const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {
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
            // const { [action.orderID]: removed, ...remainingOrders } = state.newOrders;
            // return {
            //   ...state,
            //   activeOrder: null,
            //   newOrders: {
            //     ...remainingOrders
            //   }
            // };

            return {
                ...state,
                activeOrder: null,
            };
        default:
            return state;
    }
};

export default DashboardReducer;
