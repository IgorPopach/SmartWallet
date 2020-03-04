import React from 'react';
import { Formik, Form, FormikValues } from 'formik';

import { User } from '../../types/User';
import InputField from './../../components/@forms/InputField';
// TODO: fix validation
import { validate } from './../../utils/validation';
import Button from '../../components/Button';
import UploadField from '../../components/@forms/UploadField/UploadField';

interface InitValues {
    name: string;
    email: string;
}

interface Props {
    user: User | null;
}

const Profile = ({ user }: Props) => {
    const imageUrl = 'https://gravatar.com/avatar/d560435b0ef2c7e51cbd65fd6649618c?s=400&d=mp&r=x';

    const initialValues: InitValues = React.useMemo(() => ({ name: user.displayName, email: user.email }), []);

    const onSubmit = React.useCallback(({ name, email }: FormikValues) => {
        console.log({ name, email });
    }, []);

    const userInfo = React.useMemo(
        () => ({
            name: {
                name: 'name',
                type: 'text',
                labelTitle: 'Name',
            },
            email: {
                name: 'email',
                type: 'email',
                labelTitle: 'Email',
            },
            password: {
                name: 'password',
                type: 'password',
                labelTitle: 'Password',
            },
            confirmPassword: {
                name: 'confirmPassword',
                type: 'password',
                labelTitle: 'Confirm Password',
            },
        }),
        [],
    );

    return (
        <div className="profile">
            <div className="profile-photo">
                <img src={imageUrl} alt={user.photoURL} />
            </div>
            <div className="profile-info">
                <Formik {...{ initialValues, validate, onSubmit }}>
                    <Form>
                        {Object.keys(userInfo).map((key: keyof typeof userInfo, id) => {
                            return (
                                <InputField
                                    key={id}
                                    name={userInfo[key].name}
                                    type={userInfo[key].type}
                                    labelTitle={userInfo[key].labelTitle}
                                />
                            );
                        })}
                        <UploadField name="photo" type="file" labelTitle="Change Avatar" />
                        <Button color="secondary" className="btn-sm button" type="submit">
                            Update Profile
                        </Button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Profile;
