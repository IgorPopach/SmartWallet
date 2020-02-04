import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import RegistrationForm from './RegistrationForm';
import { AppState } from '../../store';
import { RegistrationStarts, RegistrationFinished } from '../../store/session/types';
import { registerNewUser } from '../../store/session/actions';

type Dispatches = ThunkDispatch<AppState, undefined, RegistrationStarts | RegistrationFinished>;

interface DispatchProps {
    register: (email: string, password: string) => Promise<{ isSuccessful: boolean }>;
}

const mapDispatchToProps = (dispatch: Dispatches): DispatchProps => ({
    register: (email, password) => dispatch(registerNewUser(email, password)),
});

export default connect(null, mapDispatchToProps)(RegistrationForm);
