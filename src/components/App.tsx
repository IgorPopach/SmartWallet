import React from 'react';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import RegistrationForm from './Register/Form';
import { initializeSession, logIn, logOut } from '../store/session/actions';
import { AppState } from '../store';
import { User } from '../types/User';
import LogoutBtn from './LogoutBtn';
import LoginForm from './Login/Form';

interface StateProps {
    user: User | null;
}
interface DispatchProps {
    initialize: typeof initializeSession;
    onLogin: (login: string, password: string) => void;
    onLogout: () => void;
}

interface OwnProps {
    title: string;
    paragraph: string;
}

type Props = StateProps & DispatchProps & OwnProps;

// TODO: Temporary solution need refactoring
// tslint:disable:jsx-no-multiline-js
const App: React.FC<Props> = ({ title, paragraph, initialize, user, onLogin, onLogout }) => {
    
    React.useEffect(() => {
        initialize();
    }, []);

    return (
        <div className="container-md app">
            <h2>{title}</h2>
            <p>{paragraph}</p>
            <FontAwesomeIcon icon={faCoffee} />
            <button className="btn btn-primary">Primary</button>
            <hr/>
            {!!user ? (
                <LogoutBtn onLogout={onLogout}/>
            ) : (
                <>
                    <LoginForm onSubmit={onLogin}/>
                    <RegistrationForm title="Register"/>
                </>
            )}
        </div>
    );
};

const mapStateToProps = ({ session }: AppState) => ({
    user: session.user,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    {
        initialize: initializeSession,
        onLogin: logIn,
        onLogout: logOut,
    },
    dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(App);