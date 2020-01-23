import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { 
    UPDATE_SNACKBAR, 
    SnackbarState, 
    SHOW_SNACKBAR, 
    HIDE_SNACKBAR, 
    DELETE_MESSAGE, 
    ADD_MESSAGE, 
    AddedMessage, 
    HideSnackbar
} from './types';
import { AppState } from '..';

type HideSnackbarEpic = (ms: number) => ThunkAction<
    void,
    AppState,
    undefined,
    HideSnackbar
>;

export const updateSnackbar = (newSnackbar: SnackbarState) => ({
    type: UPDATE_SNACKBAR,
    payload: newSnackbar
})

export const showSnackbar = () => ({
    type: SHOW_SNACKBAR
})

export const hideSnackbar = () => {
    return {
        type: HIDE_SNACKBAR
    }
}

export const deleteMessage = (id: string) => ({
    type: DELETE_MESSAGE,
    payload: id
})

export const addMessage = (message: AddedMessage) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newMessage = {
        ...message,
        id
    }
    return {
        type: ADD_MESSAGE,
        payload: newMessage
    }
}

export const hideSnackWithDelay: HideSnackbarEpic = (ms: number) => (dispatch) => {
    setTimeout(() => dispatch(hideSnackbar), ms)
}