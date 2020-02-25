import React from 'react';
import { History } from 'history';
import { Formik, FormikValues, Form } from 'formik';

import { validate } from '../../utils/validation';
import Button from '../../components/Button';
import { PATH } from '../../routes/path';
import InputField from '../../components/@forms/InputField';

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
                    <InputField name="firstName" type="text" labelTitle="First Name" />
                    <InputField name="lastName" type="text" labelTitle="Last Name" />
                    <InputField name="email" type="email" labelTitle="Email" required={true} />
                    <InputField name="password" type="password" labelTitle="Password" required={true} />
                    <InputField name="confirmPassword" type="password" labelTitle="Confirm password" required={true} />

                    <Button color="primary" className="btn-sm" type="submit">
                        Sign up
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default RegistrationForm;
