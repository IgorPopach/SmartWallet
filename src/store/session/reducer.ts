import { SessionState, UPDATE_SESSION, SessionActionTypes } from './types'

const initialState: SessionState = {
    user: null,
}

export const sessionReducer = (state: SessionState = initialState, action: SessionActionTypes): SessionState => {
    switch (action.type) {
        case UPDATE_SESSION:
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state
    }
}
