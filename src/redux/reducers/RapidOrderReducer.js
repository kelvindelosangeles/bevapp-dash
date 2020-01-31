const initialState = {
  atcVisible: false,
  atcfVisible: false,
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
    case "TOGGLE_ATCF":
      return {
        ...state,
        atcfVisible: !state.atcVisible,
        orderItem: { ...action.item }
      };
    case "CLOSE_ATC":
      return {
        ...state,
        atcVisible: false,
        atcfVisible: false
      };
    case "ADD_TO_CART":
      return {
        ...state,
        atcVisible: false,
        atcfVisible: false,
        order: { ...state.order, [action.item.id]: action.item }
      };
    case "CANCEL_ORDER":
      return {
        ...state,
        order: {}
      };
    case "SUBMIT_ORDER":
      return {
        ...state,
        order: {}
      };
    case "REMOVE_ITEM":
      // destructure to remove a key from an object
      const { [action.id]: removed, ...newOrder } = state.order;
      return {
        ...state,
        order: { ...newOrder }
      };
    default:
      return state;
  }
};

export default RapidOrderReducer;
