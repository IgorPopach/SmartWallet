import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import RegistrationForm from './RegistrationForm';
import { AppState } from '../../store';
import { RegistrationStarts, RegistrationFinished } from '../../store/session/types';
import { registerNewUser } from '../../store/session/actions';

type Dispatches = ThunkDispatch<AppState, undefined, RegistrationStarts | RegistrationFinished>;

interface DispatchProps {
    register: (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ) => Promise<{ isSuccessful: boolean }>;
}

const mapDispatchToProps = (dispatch: Dispatches): DispatchProps => ({
    register: (firstName, lastName, email, password) => dispatch(registerNewUser(firstName, lastName, email, password)),
});

export default connect(null, mapDispatchToProps)(RegistrationForm);
