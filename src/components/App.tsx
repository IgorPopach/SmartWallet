import React, { FunctionComponent, useCallback } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Snackbar from './Snackbar/Snackbar';
import { showSnackbar, hideSnackbar, addMessage } from './../store/snackbar/actions';
import { AddedMessage } from './../store/snackbar/types';

export interface AppProps {
    title: string,
    paragraph: string,
    showSnack: () => void,
    hideSnack: () => void,
    incrementMessage: (message: AddedMessage) => void,
}


const App: FunctionComponent<AppProps> = ({ title, paragraph, showSnack, hideSnack, incrementMessage }) => {

    const messageObj = {
        title,
        text: paragraph,
        type: 'success'
    }

    const addMessageCallback = useCallback(() => incrementMessage(messageObj), [messageObj]);

    return (
        <div className="container-md app">
            <Snackbar />
            <h2>{title}</h2>
            <p>{paragraph}</p>
            <div style={{width:"100px"}}>
            <button className="btn btn-primary" onClick={showSnack}>Show Snackbar</button>
            <button className="btn btn-danger" onClick={hideSnack}>Hide Snackbar</button>
            <button className="btn btn-danger" onClick={addMessageCallback}>Add this message</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    showSnack: () => dispatch(showSnackbar()),
    hideSnack: () => dispatch(hideSnackbar()),
    incrementMessage: (message: AddedMessage) => dispatch(addMessage(message)),
})

export default connect(null, mapDispatchToProps)(App);