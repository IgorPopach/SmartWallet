import { User } from "../../types/User";

export const INITIALIZATION_STARTS = '@session/INITIALIZATION-STARTS';
export const INITIALIZATION_FINISHED = '@session/INITIALIZATION-FINISHED';
export const REGISTRATION_STARTS = '@session/REGISTRATION-STARTS';
export const REGISTRATION_FINISHED = '@session/REGISTRATION-FINISHED';
export const STORE_USER = '@session/STORE-USER';

interface ActionTypes {
    INITIALIZATION_STARTS: typeof INITIALIZATION_STARTS,
    INITIALIZATION_FINISHED: typeof INITIALIZATION_FINISHED,
    REGISTRATION_STARTS: typeof REGISTRATION_STARTS,
    REGISTRATION_FINISHED: typeof REGISTRATION_FINISHED,
    STORE_USER: typeof STORE_USER,
}

export const TYPES: ActionTypes = {
    INITIALIZATION_STARTS,
    INITIALIZATION_FINISHED,
    REGISTRATION_STARTS,
    REGISTRATION_FINISHED,
    STORE_USER,
};

export interface SessionState {
    loggedIn: boolean
    session: string
    user: string
}

export interface InitializeSessionStarts {
    type: typeof INITIALIZATION_STARTS
};

export interface InitializeSessionFinished {
    type: typeof INITIALIZATION_FINISHED
};

export interface StoreUser {
    type: typeof STORE_USER,
    payload: User,
};

export interface RegistrationStarts {
    type: typeof REGISTRATION_STARTS
};

export interface RegistrationFinished {
    type: typeof REGISTRATION_FINISHED
};

export type SessionActionTypes = RegistrationStarts | RegistrationFinished | StoreUser;
