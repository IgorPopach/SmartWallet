import React, { FunctionComponent, useState, SyntheticEvent } from 'react';
import { connect } from 'react-redux';

import Input from './@forms/Input';
import Button from './Button';
import Checkbox from './@forms/Checkbox';
import { auth } from './../store/session/actions';

import './../styles/components/SignIn.scss';
import { AppState } from '../store';

interface StateProps {
    user: {
        name: string;
    };
}

interface DispatchProps {
    // getUser: (email: string) => void;
    onAuth: (email: string, password: string) => void;
}

type Props = StateProps & DispatchProps;

const SignIn: FunctionComponent<Props> = ({ onAuth }) => {
    const [inputFields, updateFields] = useState({ email: null, password: null });
    const changeHandler = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        updateFields(() => {
            return {
                ...inputFields,
                [target.name]: target.value,
            };
        });
    };
    const toggleCheckbox = () => {
        console.log('good');
    };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        onAuth(inputFields.email, inputFields.password);
    };

    return (
        <div className="text-center">
            <form className="form-signIn" onSubmit={submitHandler}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">
                    Email address
                </label>
                <Input
                    type="email"
                    name="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    value={inputFields.email}
                    required={true}
                    autofocus={true}
                    onChange={changeHandler}
                />
                <label htmlFor="inputPassword" className="sr-only">
                    Password
                </label>
                <Input
                    type="password"
                    name="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    value={inputFields.password}
                    required={true}
                    onChange={changeHandler}
                />
                <div className="checkbox mb-3">
                    <label>
                        <Checkbox checked={false} onChange={toggleCheckbox} />
                        Remember me
                    </label>
                </div>
                <Button color="primary" className="btn-lg btn-block" type="submit">
                    Sign in
                </Button>
            </form>
        </div>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    user: state.session.user,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    onAuth: (email, password) => dispatch(auth(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
