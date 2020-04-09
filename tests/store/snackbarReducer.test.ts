import { initialState, snackbarReducer } from './../../src/store/snackbar/reducer';
import { TYPES, SnackbarActionTypes, SnackbarState } from './../../src/store/snackbar/types';

describe('Snackbar reducer:', () => {
    it('Should return the initial state', () => {
        expect(snackbarReducer(undefined, {} as SnackbarActionTypes)).toEqual(initialState);
    });

    it('ADD_MESSAGE', () => {
        const action: SnackbarActionTypes = {
            type: TYPES.ADD_MESSAGE,
            payload: { id: '1', messageText: 'new message', title: 'title', type: 'type' },
        };

        expect(snackbarReducer(initialState, action)).toEqual({
            ...initialState,
            messages: [action.payload],
        });
    });

    it('ADD_MESSAGE to the end of array', () => {
        const state: SnackbarState = {
            messages: [{ id: '1', messageText: 'first message', title: 'title', type: 'type' }],
        };
        const action: SnackbarActionTypes = {
            type: TYPES.ADD_MESSAGE,
            payload: { id: '2', messageText: 'new message', title: 'title', type: 'type' },
        };

        expect(snackbarReducer(state, action)).toEqual({
            ...initialState,
            messages: [state.messages[0], action.payload],
        });
    });

    it('DELETE_MESSAGE', () => {
        const state: SnackbarState = {
            messages: [
                { id: '1', messageText: 'first message', title: 'title', type: 'type' },
                { id: '2', messageText: 'second message', title: 'title', type: 'type' },
                { id: '3', messageText: 'last message', title: 'title', type: 'type' },
            ],
        };
        const action: SnackbarActionTypes = {
            type: TYPES.DELETE_MESSAGE,
            payload: '2',
        };

        expect(snackbarReducer(state, action)).toEqual({
            ...state,
            messages: [state.messages[0], state.messages[2]],
        });
    });
});
