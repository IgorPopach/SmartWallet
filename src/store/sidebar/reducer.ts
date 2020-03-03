import { SidebarState, SidebarActionTypes, TYPES } from './types';

const initialState: SidebarState = {
    isVisible: false,
};

export const sidebarReducer = (state = initialState, action: SidebarActionTypes): SidebarState => {
    switch (action.type) {
        case TYPES.TOGGLE_SIDEBAR:
            return { ...state, isVisible: !state.isVisible };
        case TYPES.CLOSE_SIDEBAR:
            return { ...state, isVisible: false };
        default:
            return state;
    }
};
