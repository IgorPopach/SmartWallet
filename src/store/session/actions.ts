import { UPDATE_SESSION, AUTH_START, SessionState, SessionActionTypes } from './types';
import service from './../../services/http';

export const updateSession = (newSession: SessionState):SessionActionTypes => ({
    type: UPDATE_SESSION,
    payload: newSession
})

export const authStart = ():SessionActionTypes => ({
    type: AUTH_START
})

export const auth = (email, password) => dispatch => {
    dispatch(authStart());
    service.post('sign-in', null, {email, password})
        .then( data => dispatch(updateSession(data)) )
}