import { SnackbarState, SnackbarActionTypes, TYPES } from './types';

const initialState: SnackbarState = {
    messages: [
        {
            id: '1',
            title: 'error',
            text: 'this is error!',
            type: 'danger',
        },
    ],
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
