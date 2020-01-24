import React, { FormEvent } from 'react';

interface Props {
    onSubmit: (login: string, password: string) => void;
}
interface LoginData extends HTMLFormControlsCollection {
    login: HTMLInputElement;
    password: HTMLInputElement;
}
// TODO: replace form with Formik
const LoginForm = ({ onSubmit }: Props) => {
    const handleSubmit = React.useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const login = ((event.target as HTMLFormElement).elements as LoginData).login.value;
            const password = ((event.target as HTMLFormElement).elements as LoginData).password.value;
            onSubmit(login, password);
        },
        [],
    );
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="login" id="email"/>
            <br/>
            <label htmlFor="password">Email</label>
            <input type="password" name="password" id="password"/>
            <br/>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
