const initialState = {
  orders: {},
  activeOrder: {}
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT_ORDER":
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.details.orderID]: {
            order: action.order,
            customer: action.customer,
            details: action.details
          }
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
