const initialState = {
  orders: {}
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT_ORDER":
      return {
        orders: {
          ...state.orders,
          [action.details.orderID]: {
            order: action.order,
            customer: action.customer,
            details: action.details
          }
        }
      };
    default:
      return state;
  }
};

export default DashboardReducer;
