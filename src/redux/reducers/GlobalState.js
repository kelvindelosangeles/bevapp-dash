const initialState = {
    sidebarExpanded: true,
    drawerOpen: true,
    changeLogOpen: false,
    settingsOpen: false,
};

const GlobalState = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_EXPAND":
            return {
                ...state,
                sidebarExpanded: !state.sidebarExpanded,
            };
        case "TOGGLE_DRAWER":
            return { ...state, drawerOpen: !state.drawerOpen };
        case "TOGGLE_CHANGE_LOG":
            return { ...state, changeLogOpen: !state.changeLogOpen };
        case "TOGGLE_SETTINGS":
            return { ...state, settingsOpen: !state.settingsOpen };
        default:
            return state;
    }
};

export default GlobalState;
