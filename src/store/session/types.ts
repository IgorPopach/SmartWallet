export const UPDATE_SESSION = 'UPDATE_SESSION';

export const ACTION_TYPES = {
    UPDATE_SESSION,
};

export interface SessionState {
    user: User|null;
}

export interface User {
    name: string;
}

interface UpdateSessionAction {
    type: typeof UPDATE_SESSION
    payload: SessionState
}

export type SessionActionTypes = UpdateSessionAction