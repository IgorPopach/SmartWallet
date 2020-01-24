export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const UPDATE_SNACKBAR = 'UPDATE_SNACKBAR';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export interface SnackbarState {
    messages: Message[];
}

export interface Message {
    id: string;
    title: string;
    text: string;
    type: string;
}

export interface AddedMessage {
    title: string;
    text: string;
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