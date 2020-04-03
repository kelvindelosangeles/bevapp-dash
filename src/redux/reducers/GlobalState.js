const initialState = {
    sidebarExpanded: true,
    drawerOpen: true
};

const GlobalState = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_EXPAND":
            return {
                ...state,
                sidebarExpanded: !state.sidebarExpanded
            };
        case "TOGGLE_DRAWER":
            return { drawerOpen: !state.drawerOpen };
        default:
            return state;
    }
};

export default GlobalState;
