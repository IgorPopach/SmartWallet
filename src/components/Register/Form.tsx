import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';

import { registerNewUser } from '../../store/session/actions';

interface DispatchProps {
    register: (email: string, password: string) => Promise<{ isSuccessful: boolean }>,
}

interface OwnProps {
    title: string;
}

type Props = OwnProps & DispatchProps;

interface RegisterData extends HTMLFormControlsCollection {
    login: HTMLInputElement;
    password: HTMLInputElement;
}
// TODO: use Formik instead
// https://jaredpalmer.com/formik/
const RegistrationForm = ({ title, register }: Props) => {
    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const login = ((event.target as HTMLFormElement).elements as RegisterData).login.value;
        const password = ((event.target as HTMLFormElement).elements as RegisterData).password.value;
        // TODO: on success redirect to login
        register(login, password).then(({ isSuccessful }) => console.log({ isSuccessful }));
        return false;
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <h2>{title}</h2>
            <label htmlFor="login">Login</label>
            <input type="email" id="login" name="login"/>
            <br/>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password"/>
            <br/>
            <button type="submit">Register</button>
        </form>
    )
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    { register: registerNewUser },
    dispatch,
)

export default connect(null, mapDispatchToProps)(RegistrationForm);