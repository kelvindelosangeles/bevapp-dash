const initialState = {
  sidebarExpanded: true
};

const GlobalState = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_EXPAND":
      return {
        ...state,
        sidebarExpanded: !state.sidebarExpanded
      };
    default:
      return state;
  }
};

export default GlobalState;
