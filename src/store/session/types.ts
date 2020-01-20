export const UPDATE_SESSION = 'UPDATE_SESSION';

export interface SessionState {
    loggedIn: boolean
    session: string
    userName: string
}

interface UpdateSessionAction {
    type: typeof UPDATE_SESSION
    payload: SessionState
}

export type SessionActionTypes = UpdateSessionAction