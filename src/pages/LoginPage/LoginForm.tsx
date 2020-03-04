import React from 'react';
import { Formik, Form, FormikValues } from 'formik';

import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { validate } from '../../utils/validation';
import { History } from 'history';
import { PATH } from '../../routes/path';
import InputField from '../../components/@forms/InputField';

interface DispatchProps {
    logInAction: (login: string, password: string) => Promise<{ isSuccessful: boolean }>;
}

interface OwnProps {
    history: History;
}

type Props = DispatchProps & OwnProps;

const LoginForm = ({ logInAction, history }: Props) => {
    const initialValues = React.useMemo(() => ({ email: '', password: '' }), []);

    const onSubmit = React.useCallback(
        ({ email, password }: FormikValues) => {
            logInAction(email, password).then(({ isSuccessful }) => {
                if (isSuccessful) {
                    history.push(PATH.HOME);
                }
            });
        },
        [logInAction],
    );

    return (
        <div className="form form-signIn">
            <h2>Please sign in</h2>
            <Formik {...{ initialValues, validate, onSubmit }}>
                <Form>
                    <InputField name="email" type="email" labelTitle="Email" />
                    <InputField name="password" type="password" labelTitle="Password" />
                    <Button color="primary" className="btn-sm" type="submit">
                        Sign in
                    </Button>
                    <Link to="/register" className="form-signIn-link">
                        Create an account
                    </Link>
                </Form>
            </Formik>
        </div>
    );
};

export default LoginForm;
