import React, { useCallback, useState } from 'react';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RegistrationForm from './Register/Form';
import { initializeSession, logIn, logOut } from '../store/session/actions';
import { AppState } from '../store';
import { User } from '../types/User';
import LogoutBtn from './LogoutBtn';
import LoginForm from './Login/Form';
import Snackbar from '../containers/Snackbar/';
import { addMessage } from './../store/snackbar/actions';
import { AddedMessage } from './../store/snackbar/types';
import Alert from './../components/Alert/Alert';

interface StateProps {
    user: User | null;
}
interface DispatchProps {
    initialize: typeof initializeSession;
    onLogin: (login: string, password: string) => void;
    onLogout: () => void;
    incrementMessage: (message: AddedMessage) => void;
}

interface OwnProps {
    title: string;
    paragraph: string;
}

type Props = StateProps & DispatchProps & OwnProps;

// TODO: Temporary solution need refactoring
// tslint:disable:jsx-no-multiline-js
export const App: React.FC<Props> = ({ title, paragraph, initialize, user, onLogin, onLogout, incrementMessage }) => {
    const [showAlert, setAlert] = useState(true);

    React.useEffect(() => {
        initialize();
    }, []);

    const messageObj = {
        title,
        text: paragraph,
        type: 'success',
    };

    const addMessageCallback = useCallback(() => incrementMessage(messageObj), [messageObj]);

    const handleClose = useCallback(() => setAlert(false), []);

    return (
        <div className="container-md app">
            <Snackbar />
            <h2>{title}</h2>
            <p>{paragraph}</p>
            <button className="btn btn-danger" onClick={addMessageCallback}>
                Add this message
            </button>
            <hr />
            {!!user ? (
                <LogoutBtn onLogout={onLogout} />
            ) : (
                <>
                    <LoginForm onSubmit={onLogin} />
                    <RegistrationForm title="Register" />
                </>
            )}
            <Alert message={messageObj} delay={3000} />
            {showAlert && <Alert message={messageObj} onClose={handleClose} />}
        </div>
    );
};

const mapStateToProps = ({ session }: AppState) => ({
    user: session.user,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
        {
            initialize: initializeSession,
            onLogin: logIn,
            onLogout: logOut,
            incrementMessage: addMessage,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(App);
