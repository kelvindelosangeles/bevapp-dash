const initialState = {
  atcVisible: false,
  atcfVisible: false,
  customer: null,
  orderItem: {},
  cart: {},
  editMode: false,
  orderToEdit: {}
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
        atcfVisible: false,
        orderItem: {}
      };
    case "ADD_TO_CART":
      return {
        ...state,
        atcVisible: false,
        atcfVisible: false,
        cart: { ...state.cart, [action.item.id]: action.item }
      };
    case "CANCEL_ORDER":
      return {
        ...state,
        cart: {},
        editMode: false,
        orderToEdit: {}
      };
    case "SUBMIT_ORDER":
      return {
        ...state,
        cart: {}
      };
    case "SUBMIT_EDIT":
      return {
        ...state,
        cart: {},
        editMode: false,
        orderToEdit: {}
      };
    case "REMOVE_ITEM":
      // destructure to remove a key from an object
      const { [action.id]: removed, ...items } = state.cart;
      return {
        ...state,
        cart: { ...items }
      };
    case "EDIT_ORDER":
      return {
        ...state,
        cart: { ...action.order.cart },
        orderToEdit: { ...action.order },
        editMode: true
      };
    case "SET_CUSTOMER":
      return {
        ...state,
        customer: action.customer
      };
    default:
      return state;
  }
};

export default RapidOrderReducer;
