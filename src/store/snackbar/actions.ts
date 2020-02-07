import { TYPES } from './types';

export const deleteMessage = (id: string) => ({
    type: TYPES.DELETE_MESSAGE,
    payload: id,
});

export const addMessage = (messageText: string, title?: string, type?: string) => {
    const id = Math.random()
        .toString(36)
        .substr(2, 9);
    if (!title) {
        title = '';
    }
    if (!type) {
        type = 'primary';
    }
    const newMessage = {
        messageText,
        title,
        type,
        id,
    };
    return {
        type: TYPES.ADD_MESSAGE,
        payload: newMessage,
    };
};
