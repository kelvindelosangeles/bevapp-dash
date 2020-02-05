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
    case "SUBMIT_EDIT":
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.details.orderID]: {
            ...state.orders[action.details.orderID],
            editedOrder: {
              order: { ...action.order },
              details: {
                editedAt: action.details.createdAt,
                editedBy: "admin"
              }
            }
          }
        }
      };
    case "TOGGLE_ORDER":
      return { ...state, activeOrder: { ...action.order } };
    case "SET_ACTIVE_ORDER":
      return { ...state, activeOrder: { ...action.order } };
    case "DELETE_ORDER":
      const { [action.orderID]: removed, ...newOrders } = state.orders;
      return {
        ...state,
        activeOrder: {},
        orders: {
          ...newOrders
        }
      };
    default:
      return state;
  }
};

export default DashboardReducer;
