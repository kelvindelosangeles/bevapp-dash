const initialState = {
  customer: null
};

const SpecialPricingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SP_CUSTOMER":
      return {
        ...state,
        customer: action.customer
      };
    default:
      return state;
  }
};

export default SpecialPricingReducer;
