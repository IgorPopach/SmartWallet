import { addMessage, deleteMessage } from './../../src/store/snackbar/actions';
import { TYPES, SnackbarActionTypes } from './../../src/store/snackbar/types';

describe('Snackbar actions:', () => {
    it('addMessage() should attach new message', () => {
        const expectedAction: SnackbarActionTypes = {
            type: TYPES.ADD_MESSAGE,
            payload: {
                messageText: 'new message',
                title: 'title',
                type: 'type',
            },
        };

        expect(addMessage('new message', 'title', 'type')).toMatchObject(expectedAction);
        expect(addMessage('new message', 'title', 'type')).toHaveProperty('payload.id');
    });

    it('deleteMessage() should create an action with message id that must be deleted', () => {
        const expectedAction: SnackbarActionTypes = {
            type: TYPES.DELETE_MESSAGE,
            payload: '1',
        };

        expect(deleteMessage('1')).toEqual(expectedAction);
    });
});
