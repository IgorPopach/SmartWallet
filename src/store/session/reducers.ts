import { SessionState, SessionActionTypes, TYPES } from './types';
import { User } from '../../types/User';

const initialState: SessionState = {
    user: null,
    isLoading: false,
};
// TODO: move it to common utils for reducer
function toggleLoadingState<S extends { isLoading: boolean }>(state: S, isLoading?: boolean): S {
    return {
        ...state,
        isLoading: typeof isLoading === 'undefined' ? !state.isLoading : isLoading,
    };
}

function updateUser(state: SessionState, user: User|null): SessionState {
    return { ...state, user };
}

export const sessionReducer = (state: SessionState = initialState, action: SessionActionTypes): SessionState => {
    switch (action.type) {
        case TYPES.REGISTRATION_STARTS:
        case TYPES.INITIALIZATION_STARTS: 
            return toggleLoadingState(state, true);
        case TYPES.REGISTRATION_FINISHED:
        case TYPES.INITIALIZATION_FINISHED:
            return toggleLoadingState(state, true);
        case TYPES.STORE_USER: 
            return updateUser(state, action.payload);
        default: return state;
    }
};
