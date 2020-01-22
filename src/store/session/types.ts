export const UPDATE_SESSION = 'UPDATE_SESSION';
export const AUTH_START = 'AUTH_START';

export const ACTION_TYPES = {
    UPDATE_SESSION,
};

export interface SessionState {
    user: User|null;
    isLoading: boolean;
}

export interface User {
    name: string;
}

interface AuthStart {
    type: typeof AUTH_START
}

interface UpdateSessionAction {
    type: typeof UPDATE_SESSION
    payload: SessionState
}


export type SessionActionTypes = UpdateSessionAction | AuthStart