import React from 'react';
import { History } from 'history';
import { Formik, FormikValues, Form, Field, ErrorMessage } from 'formik';

import { validate } from '../../utils/validation';
import Button from '../../components/Button';
import { PATH } from '../../routes/path';

interface DispatchProps {
    register: (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ) => Promise<{ isSuccessful: boolean }>;
}

interface OwnProps {
    history: History;
}

type Props = DispatchProps & OwnProps;

const RegistrationForm = ({ register, history }: Props) => {
    const initialValues = React.useMemo(
        () => ({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }),
        [],
    );
    const onSubmit = React.useCallback(
        ({ firstName, lastName, email, password }: FormikValues) => {
            register(firstName, lastName, email, password).then(({ isSuccessful }) => {
                if (isSuccessful) {
                    history.push(PATH.LOGIN);
                }
            });
        },
        [register],
    );

    return (
        <div className="form form-signUp">
            <h2>Please sign up</h2>
            <Formik {...{ initialValues, validate, onSubmit }}>
                <Form>
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" type="text" />
                    <ErrorMessage component="span" name="firstName" />

                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" type="text" />
                    <ErrorMessage component="span" name="lastName" />

                    <label htmlFor="email">
                        Email<sup>*</sup>
                    </label>
                    <Field name="email" type="email" />
                    <ErrorMessage component="span" name="email" />

                    <label htmlFor="password">
                        Password<sup>*</sup>
                    </label>
                    <Field name="password" type="password" />
                    <ErrorMessage component="span" name="password" />

                    <label htmlFor="confirmPassword">
                        Confirm password<sup>*</sup>
                    </label>
                    <Field name="confirmPassword" type="password" />
                    <ErrorMessage component="span" name="confirmPassword" />

                    <Button color="primary" className="btn-sm" type="submit">
                        Sign up
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default RegistrationForm;
