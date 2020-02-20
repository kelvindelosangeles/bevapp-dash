import { Order } from "../../Models/Order";

const initialState = {
  newOrders: {},
  activeOrder: null
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT_ORDER":
      const { customer, details, cart } = action;
      return {
        ...state,
        newOrders: {
          ...state.newOrders,
          [action.details.orderID]: new Order(customer, details, cart)
        }
      };
    case "SUBMIT_EDIT":
      return {
        ...state,
        newOrders: {
          ...state.newOrders,
          [action.details.orderID]: {
            ...state.newOrders[action.details.orderID],
            editedOrder: {
              cart: { ...action.cart },
              details: {
                editedAt: action.details.createdAt,
                editedBy: "admin"
              }
            }
          }
        },
        activeOrder: null
      };
    case "TOGGLE_ORDER":
      return { ...state, activeOrder: { ...action.order } };
    case "CLEAR_ORDER":
      return {
        ...state,
        activeOrder: null
      };
    case "SET_ACTIVE_ORDER":
      return { ...state, activeOrder: { ...action.order } };
    case "DELETE_ORDER":
      const { [action.orderID]: removed, ...remainingOrders } = state.newOrders;
      return {
        ...state,
        activeOrder: null,
        newOrders: {
          ...remainingOrders
        }
      };
    default:
      return state;
  }
};

export default DashboardReducer;
