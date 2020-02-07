import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';

import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { validate } from '../../utils/validation';
import { History } from 'history';
import { PATH } from '../../routes/path';

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
        <div className="form">
            <h2>Please sign in</h2>
            <Formik {...{ initialValues, validate, onSubmit }}>
                <Form>
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" />
                    <ErrorMessage component="span" name="email" />

                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" />
                    <ErrorMessage component="span" name="password" />

                    <Button color="primary" className="btn-sm" type="submit">
                        Sign in
                    </Button>
                    <Link to="/register">Create an account</Link>
                </Form>
            </Formik>
        </div>
    );
};

export default LoginForm;
