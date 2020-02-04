import { connect } from 'react-redux';

import { logIn } from '../../store/session/actions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../store';
import { LoginStarts, LoginFinished, StoreUser } from '../../store/session/types';
import LoginForm from './LoginForm';

type DispatchAsync = ThunkDispatch<AppState, undefined, LoginStarts | LoginFinished | StoreUser>;

interface DispatchProps {
    logInAction: (login: string, password: string) => Promise<{ isSuccessful: boolean }>;
}

const mapDispatchToProps = (dispatch: DispatchAsync): DispatchProps => ({
    logInAction: (email, password) => dispatch(logIn(email, password)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
