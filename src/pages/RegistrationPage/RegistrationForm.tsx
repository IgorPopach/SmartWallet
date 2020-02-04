import React from 'react';
import { History } from 'history';
import { Formik, FormikValues, Form, Field, ErrorMessage } from 'formik';

import { validate } from '../../utils/validation';
import Button from '../../components/Button';
import { PATH } from '../../routes/path';

interface DispatchProps {
    register: (email: string, password: string) => Promise<{ isSuccessful: boolean }>;
}

interface OwnProps {
    history: History;
}

type Props = DispatchProps & OwnProps;

const RegistrationForm = ({ register, history }: Props) => {
    const formikProps = {
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: ({ email, password }: FormikValues) => {
            register(email, password).then(({ isSuccessful }) => {
                if (isSuccessful) {
                    history.push(PATH.LOGIN);
                }
            });
        },
    };

    return (
        <div className="form form-signUp">
            <h2>Please sign up</h2>
            <Formik initialValues={formikProps.initialValues} validate={validate} onSubmit={formikProps.onSubmit}>
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
