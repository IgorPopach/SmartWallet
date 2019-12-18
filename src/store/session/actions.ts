import { UPDATE_SESSION, SessionState, SessionActionTypes } from './types'

export const updateSession = (newSession: SessionState) => ({
    type: UPDATE_SESSION,
    payload: newSession
})