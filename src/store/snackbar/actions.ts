import {
    DELETE_MESSAGE, 
    ADD_MESSAGE, 
    AddedMessage,
} from './types';

export const deleteMessage = (id: string) => ({
    type: DELETE_MESSAGE,
    payload: id
});

export const addMessage = (message: AddedMessage) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newMessage = {
        ...message,
        id
    };
    return {
        type: ADD_MESSAGE,
        payload: newMessage
    };
};