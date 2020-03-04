import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
    RegistrationStarts,
    RegistrationFinished,
    StoreUser,
    InitializeSessionStarts,
    InitializeSessionFinished,
    TYPES,
    LoginStarts,
    LoginFinished,
    LogoutStarts,
    LogoutFinished,
} from './types';
import firebase from '../../firebase';
import { User } from '../../types/User';
import { AppState } from '..';
import { addMessage } from '../snackbar/actions';
import { AddMessage } from '../snackbar/types';

type RegistrationEpic = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
) => ThunkAction<
    Promise<{ isSuccessful: boolean }>, // What should action return
    AppState, // TODO: get Application state type;
    undefined, // extra arguments (from middleware)
    RegistrationStarts | RegistrationFinished | AddMessage
>;

export type InitializeSessionEpic = () => ThunkAction<
    void,
    AppState,
    undefined,
    InitializeSessionStarts | InitializeSessionFinished | StoreUser | AddMessage
>;

type LogInEpic = (
    login: string,
    password: string,
) => ThunkAction<
    Promise<{ isSuccessful: boolean }>,
    AppState,
    undefined,
    LoginStarts | LoginFinished | StoreUser | AddMessage
>;

type LogOutEpic = () => ThunkAction<void, AppState, undefined, LogoutStarts | LogoutFinished | StoreUser | AddMessage>;
const INITIALIZATION_STARTS_ACTION = { type: TYPES.INITIALIZATION_STARTS };
const INITIALIZATION_FINISHED_ACTION = { type: TYPES.INITIALIZATION_FINISHED };
const LOGIN_STARTS_ACTION = { type: TYPES.LOGIN_STARTS };
const LOGIN_FINISHED_ACTION = { type: TYPES.LOGIN_FINISHED };
const LOGOUT_STARTS_ACTION = { type: TYPES.LOGOUT_STARTS };
const LOGOUT_FINISHED_ACTION = { type: TYPES.LOGOUT_FINISHED };
const REGISTRATION_STARTS_ACTION = { type: TYPES.REGISTRATION_STARTS };
const REGISTRATION_FINISHED_ACTION = { type: TYPES.REGISTRATION_FINISHED };

export const storeUser = (payload: User | null) => ({
    type: TYPES.STORE_USER,
    payload,
});

function onSignIn(
    dispatch: ThunkDispatch<{}, undefined, InitializeSessionStarts | InitializeSessionFinished | StoreUser>,
    user: User,
) {
    console.log(user);
    dispatch(storeUser(user));
}

function onSignOut(
    dispatch: ThunkDispatch<{}, undefined, InitializeSessionStarts | InitializeSessionFinished | StoreUser>,
) {
    dispatch(storeUser(null));
}

function getTransformUser({ displayName, uid, email, photoURL }: firebase.User) {
    displayName = 'Mad Max';
    const user: User = { displayName, uid, email, photoURL };
    return user;
}

export const initializeSession: InitializeSessionEpic = () => (dispatch) => {
    dispatch(INITIALIZATION_STARTS_ACTION);
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
            const user = getTransformUser(firebaseUser);
            onSignIn(dispatch, user);
        } else {
            onSignOut(dispatch);
        }
        dispatch(INITIALIZATION_FINISHED_ACTION);
    });
};

export const logIn: LogInEpic = (email: string, password: string) => (dispatch): Promise<{ isSuccessful: boolean }> => {
    dispatch(LOGIN_STARTS_ACTION);
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            dispatch(LOGIN_FINISHED_ACTION);
            return { isSuccessful: true };
        })
        .catch(({ code, message, ...errorsRest }) => {
            dispatch(addMessage(message, 'Oops!', 'danger'));
            dispatch(LOGIN_FINISHED_ACTION);
            return { isSuccessful: false };
        });
};

export const logOut: LogOutEpic = () => (dispatch) => {
    dispatch(LOGOUT_STARTS_ACTION);
    firebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(LOGOUT_FINISHED_ACTION);
        })
        .catch(({ code, message, ...errorsRest }) => {
            dispatch(addMessage(message, 'Oops!', 'danger'));
            dispatch(LOGOUT_FINISHED_ACTION);
        });
};

export const registerNewUser: RegistrationEpic = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
) => (dispatch): Promise<{ isSuccessful: boolean }> => {
    dispatch(REGISTRATION_STARTS_ACTION);
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            dispatch(REGISTRATION_FINISHED_ACTION);
            dispatch(addMessage('Please sign in', 'Nice work', 'success'));
            return { isSuccessful: true };
        })
        .catch(({ code, message, ...errorsRest }) => {
            dispatch(addMessage(message, 'Oops!', 'danger'));
            dispatch(REGISTRATION_FINISHED_ACTION);
            return { isSuccessful: false };
        });
};
