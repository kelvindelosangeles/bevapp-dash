import { Order } from "../../Models/Order";

const initialState = {
  orders: {},
  activeOrder: {}
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT_ORDER":
      const { customer, details, order } = action;
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.details.orderID]: new Order(customer, details, order)
        }
      };
    case "TOGGLE_ORDER":
      return { ...state, activeOrder: { ...action.order } };
    case "SET_ACTIVE_ORDER":
      return { ...state, activeOrder: { ...action.order } };
    default:
      return state;
  }
};

export default DashboardReducer;
