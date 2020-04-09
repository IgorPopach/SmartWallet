import { SnackbarState, SnackbarActionTypes, TYPES } from './types';

export const initialState: SnackbarState = {
    messages: [],
};

export const snackbarReducer = (state = initialState, action: SnackbarActionTypes): SnackbarState => {
    switch (action.type) {
        case TYPES.DELETE_MESSAGE:
            const updateMessages = state.messages.filter((message) => message.id !== action.payload);
            return {
                ...state,
                messages: updateMessages,
            };
        case TYPES.ADD_MESSAGE:
            const addedMessages = state.messages.concat([action.payload]);
            return {
                ...state,
                messages: addedMessages,
            };
        default:
            return state;
    }
};
