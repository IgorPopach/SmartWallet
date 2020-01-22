import { SessionState, UPDATE_SESSION, AUTH_START, SessionActionTypes } from './types'

const initialState: SessionState = {
    user: null,
    isLoading: false
}

export const sessionReducer = (state: SessionState = initialState, action: SessionActionTypes): SessionState => {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_SESSION:
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state
    }
}
