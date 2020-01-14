import React, { FunctionComponent } from 'react';

import Input from './@forms/Input';
import Button from './Button';
import Checkbox from './@forms/Checkbox';

const SignIn: FunctionComponent = () => {
    const toggleCheckbox = () => {
        console.log('good')
    }
    return (
        <div className="text-center">
            <form className="form-signIn">
                <h1 className="h3 mb-3 font-weight-normal">
                    Please sign in
                </h1>
                <label htmlFor="inputEmail" className="sr-only" >Email address</label>
                <Input 
                    type="email" 
                    id="inputEmail" 
                    className="form-control" 
                    placeholder="Email address" 
                    required={true}
                    autofocus={true}
                    onChange={}
                />
                <label htmlFor="inputPassword" className="sr-only" >Password</label>
                <Input 
                    type="password" 
                    id="inputPassword" 
                    className="form-control" 
                    placeholder="Password" 
                    required={true} 
                    onChange={}
                />
                <div className="checkbox mb-3">
                    <label>
                        <Checkbox checked={false} onChange={toggleCheckbox} />
                        Remember me
                    </label>
                </div>
                <Button color="primary" className="btn-lg btn-block" type="submit" >Sign in</Button>
            </form>
        </div>
    )
}

export default SignIn;