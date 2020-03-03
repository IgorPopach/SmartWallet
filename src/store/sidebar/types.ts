export const TOGGLE_SIDEBAR = '@sidebar/TOGGLE_SIDEBAR';
export const CLOSE_SIDEBAR = '@sidebar/CLOSE_SIDEBAR';

interface ActionTypes {
    TOGGLE_SIDEBAR: typeof TOGGLE_SIDEBAR;
    CLOSE_SIDEBAR: typeof CLOSE_SIDEBAR;
}

export const TYPES: ActionTypes = {
    TOGGLE_SIDEBAR,
    CLOSE_SIDEBAR,
};

export interface SidebarState {
    isVisible: boolean;
}

export interface ToggleSidebar {
    type: typeof TOGGLE_SIDEBAR;
}

export interface CloseSidebar {
    type: typeof CLOSE_SIDEBAR;
}

export type SidebarActionTypes = ToggleSidebar | CloseSidebar;
