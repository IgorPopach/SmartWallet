export const SHOW_SNACKBAR = '@snackbar/SHOW_SNACKBAR';
export const UPDATE_SNACKBAR = '@snackbar/UPDATE_SNACKBAR';
export const DELETE_MESSAGE = '@snackbar/DELETE_MESSAGE';
export const ADD_MESSAGE = '@snackbar/ADD_MESSAGE';

interface ActionTypes {
    SHOW_SNACKBAR: typeof SHOW_SNACKBAR;
    UPDATE_SNACKBAR: typeof UPDATE_SNACKBAR;
    DELETE_MESSAGE: typeof DELETE_MESSAGE;
    ADD_MESSAGE: typeof ADD_MESSAGE;
}

export const TYPES: ActionTypes = {
    SHOW_SNACKBAR,
    UPDATE_SNACKBAR,
    DELETE_MESSAGE,
    ADD_MESSAGE,
};

export interface SnackbarState {
    messages: Message[];
}

export interface Message {
    id?: string;
    title: string;
    messageText: string;
    type: string;
}

export interface UpdateSnackbarAction {
    type: typeof UPDATE_SNACKBAR;
    payload: SnackbarState;
}

export interface ShowSnackbar {
    type: typeof SHOW_SNACKBAR;
}

export interface DeleteMessage {
    type: typeof DELETE_MESSAGE;
    payload: string;
}

export interface AddMessage {
    type: typeof ADD_MESSAGE;
    payload: Message;
}

export type SnackbarActionTypes = UpdateSnackbarAction | ShowSnackbar | DeleteMessage | AddMessage;
