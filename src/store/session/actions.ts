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

type RegistrationEpic = (
    login: string,
    password: string,
) => ThunkAction<
    Promise<{ isSuccessful: boolean }>, // What should action return
    AppState, // TODO: get Application state type;
    undefined, // extra arguments (from middleware)
    RegistrationStarts | RegistrationFinished // TODO: add error action
>;

type InitializeSessionEpic = () => ThunkAction<
    void,
    AppState,
    undefined,
    InitializeSessionStarts | InitializeSessionFinished | StoreUser // TODO: add error action
>;

type LogInEpic = (
    login: string,
    password: string,
) => ThunkAction<
    void,
    AppState,
    undefined,
    LoginStarts | LoginFinished | StoreUser // TODO: add error action
>;

type LogOutEpic = () => ThunkAction<
    void,
    AppState,
    undefined,
    LogoutStarts | LogoutFinished | StoreUser // TODO: add error action
>;
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
    { displayName, uid, email, photoURL }: firebase.User,
) {
    console.log({ displayName, uid, email, photoURL });
    dispatch(storeUser({ displayName, uid, email, photoURL }));
}

function onSignOut(
    dispatch: ThunkDispatch<{}, undefined, InitializeSessionStarts | InitializeSessionFinished | StoreUser>,
) {
    dispatch(storeUser(null));
}

export const initializeSession: InitializeSessionEpic = () => (dispatch) => {
    dispatch(INITIALIZATION_STARTS_ACTION);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            onSignIn(dispatch, user);
        } else {
            onSignOut(dispatch);
        }
        dispatch(INITIALIZATION_FINISHED_ACTION);
    });
};

export const logIn: LogInEpic = (email: string, password: string) => (dispatch) => {
    dispatch(LOGIN_STARTS_ACTION);
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            dispatch(LOGIN_FINISHED_ACTION);
        })
        .catch(({ code, message, ...errorsRest }) => {
            console.log({ code, message, errorsRest });
            // TODO: display error in Global errors
            dispatch(LOGIN_FINISHED_ACTION);
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
            console.log({ code, message, errorsRest });
            // TODO: display error in Global errors
            dispatch(LOGOUT_FINISHED_ACTION);
        });
};

export const registerNewUser: RegistrationEpic = (login: string, password: string) => (
    dispatch,
): Promise<{ isSuccessful: boolean }> => {
    dispatch(REGISTRATION_STARTS_ACTION);
    return firebase
        .auth()
        .createUserWithEmailAndPassword(login, password)
        .then(() => {
            dispatch(REGISTRATION_FINISHED_ACTION);
            return { isSuccessful: true };
        })
        .catch(({ code, message, ...errorsRest }) => {
            console.log({ code, message, errorsRest });
            // TODO: display error in Global errors
            dispatch(REGISTRATION_FINISHED_ACTION);
            return { isSuccessful: false };
        });
};
