const initialState = {
    sidebarExpanded: true,
    drawerOpen: true,
    changeLogOpen: false
};

const GlobalState = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_EXPAND":
            return {
                ...state,
                sidebarExpanded: !state.sidebarExpanded
            };
        case "TOGGLE_DRAWER":
            return { ...state, drawerOpen: !state.drawerOpen };
        case "TOGGLE_CHANGE_LOG":
            return { ...state, changeLogOpen: !state.changeLogOpen };
        default:
            return state;
    }
};

export default GlobalState;
