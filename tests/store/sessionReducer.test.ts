import { sessionReducer } from './../../src/store/session/reducer';
import { TYPES, SessionActionTypes, SessionState } from './../../src/store/session/types';

describe('Session reducer:', () => {
    const initialState: SessionState = {
        user: null,
        isLoading: false,
    };

    it('Should return the initial state', () => {
        expect(sessionReducer(undefined, {} as SessionActionTypes)).toEqual(initialState);
    });

    it('INITIALIZATION_STARTS', () => {
        const action: SessionActionTypes = {
            type: TYPES.INITIALIZATION_STARTS,
        };

        expect(sessionReducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it('REGISTRATION_STARTS', () => {
        const action: SessionActionTypes = {
            type: TYPES.REGISTRATION_STARTS,
        };

        expect(sessionReducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it('LOGIN_STARTS', () => {
        const action: SessionActionTypes = {
            type: TYPES.LOGIN_STARTS,
        };

        expect(sessionReducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it('LOGIN_FINISHED', () => {
        const state: SessionState = {
            user: null,
            isLoading: true,
        };
        const action: SessionActionTypes = {
            type: TYPES.LOGIN_FINISHED,
        };

        expect(sessionReducer(state, action)).toEqual({
            ...initialState,
            isLoading: false,
        });
    });

    it('REGISTRATION_FINISHED', () => {
        const state: SessionState = {
            user: null,
            isLoading: true,
        };
        const action: SessionActionTypes = {
            type: TYPES.REGISTRATION_FINISHED,
        };

        expect(sessionReducer(state, action)).toEqual({
            ...initialState,
            isLoading: false,
        });
    });

    it('INITIALIZATION_FINISHED', () => {
        const state: SessionState = {
            user: null,
            isLoading: true,
        };
        const action: SessionActionTypes = {
            type: TYPES.INITIALIZATION_FINISHED,
        };

        expect(sessionReducer(state, action)).toEqual({
            ...initialState,
            isLoading: false,
        });
    });

    it('STORE_USER', () => {
        const state: SessionState = {
            user: null,
            isLoading: true,
        };
        const action: SessionActionTypes = {
            type: TYPES.STORE_USER,
            payload: {
                displayName: 'name',
                email: 'email',
                photoURL: 'photo',
                uid: '123',
            },
        };

        expect(sessionReducer(state, action)).toEqual({
            ...state,
            user: action.payload,
        });
    });
});
