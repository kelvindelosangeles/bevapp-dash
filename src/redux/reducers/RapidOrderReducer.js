const initialState = {
  atcVisible: false,
  orderItem: {},
  order: {}
};

const RapidOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_ATC":
      return {
        ...state,
        atcVisible: !state.atcVisible,
        orderItem: { ...action.item }
      };
    case "CLOSE_ATC":
      return {
        ...state,
        atcVisible: false
      };
    case "ADD_TO_CART":
      return {
        ...state,
        atcVisible: false,
        order: { ...state.order, [action.item.id]: action.item }
      };
    default:
      return state;
  }
};

export default RapidOrderReducer;
