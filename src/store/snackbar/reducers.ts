import { 
    SHOW_SNACKBAR, 
    HIDE_SNACKBAR, 
    UPDATE_SNACKBAR, 
    SnackbarState, 
    SnackbarActionTypes, 
    DELETE_MESSAGE, 
    ADD_MESSAGE 
} from './types';

const initialState: SnackbarState = {
    messages: [
        {
            id: '1',
            title: 'error',
            text: 'this is error!',
            type: 'danger'
        }
    ],
    visible: true
}

export const snackbarReducer = (state = initialState, action: SnackbarActionTypes): SnackbarState => {
    switch (action.type) {
        case UPDATE_SNACKBAR:
            return {
                ...state,
                ...action.payload,
            }
        case SHOW_SNACKBAR:
            return {
                ...state,
                visible: true
            }
        case HIDE_SNACKBAR:
            return {
                ...state,
                visible: false
            }
        case DELETE_MESSAGE:
            const updateMessages = state.messages.filter(message => message.id !== action.payload)
            return {
                ...state,
                messages: updateMessages
            }
        case ADD_MESSAGE:
            const addedMessages = [action.payload].concat(state.messages)
            return {
                ...state,
                messages: addedMessages
            }
        default:
            return state;
    }
}