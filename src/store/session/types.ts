import { User } from '../../types/User';

export const INITIALIZATION_STARTS = '@session/INITIALIZATION-STARTS';
export const INITIALIZATION_FINISHED = '@session/INITIALIZATION-FINISHED';
export const LOGIN_STARTS = '@session/LOGIN-STARTS';
export const LOGIN_FINISHED = '@session/LOGIN-FINISHED';
export const LOGOUT_STARTS = '@session/LOGOUT-STARTS';
export const LOGOUT_FINISHED = '@session/LOGOUT-FINISHED';
export const REGISTRATION_STARTS = '@session/REGISTRATION-STARTS';
export const REGISTRATION_FINISHED = '@session/REGISTRATION-FINISHED';
export const STORE_USER = '@session/STORE-USER';

interface ActionTypes {
    INITIALIZATION_STARTS: typeof INITIALIZATION_STARTS;
    INITIALIZATION_FINISHED: typeof INITIALIZATION_FINISHED;
    REGISTRATION_STARTS: typeof REGISTRATION_STARTS;
    REGISTRATION_FINISHED: typeof REGISTRATION_FINISHED;
    LOGIN_STARTS: typeof LOGIN_STARTS;
    LOGIN_FINISHED: typeof LOGIN_FINISHED;
    LOGOUT_STARTS: typeof LOGOUT_STARTS;
    LOGOUT_FINISHED: typeof LOGOUT_FINISHED;
    STORE_USER: typeof STORE_USER;
}

export const TYPES: ActionTypes = {
    INITIALIZATION_STARTS,
    INITIALIZATION_FINISHED,
    REGISTRATION_STARTS,
    REGISTRATION_FINISHED,
    LOGIN_STARTS,
    LOGIN_FINISHED,
    LOGOUT_STARTS,
    LOGOUT_FINISHED,
    STORE_USER,
};

export interface SessionState {
    isLoading: boolean;
    user: User | null;
}

export interface InitializeSessionStarts {
    type: typeof INITIALIZATION_STARTS;
}

export interface InitializeSessionFinished {
    type: typeof INITIALIZATION_FINISHED;
}

export interface LoginStarts {
    type: typeof LOGIN_STARTS;
}

export interface LoginFinished {
    type: typeof LOGIN_FINISHED;
}

export interface LogoutStarts {
    type: typeof LOGOUT_STARTS;
}

export interface LogoutFinished {
    type: typeof LOGOUT_FINISHED;
}

export interface StoreUser {
    type: typeof STORE_USER;
    payload: User;
}

export interface RegistrationStarts {
    type: typeof REGISTRATION_STARTS;
}

export interface RegistrationFinished {
    type: typeof REGISTRATION_FINISHED;
}

export type SessionActionTypes =
    | RegistrationStarts
    | RegistrationFinished
    | InitializeSessionStarts
    | InitializeSessionFinished
    | LoginStarts
    | LogoutFinished
    | LogoutStarts
    | LogoutFinished
    | StoreUser;
