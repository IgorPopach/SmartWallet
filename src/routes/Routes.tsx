import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import PageNotFound from '../pages/PageNotFound';
import { User } from '../types/User';

interface Props {
    user: User | null;
}

const Routes = ({ user }: Props) =>
    user ? (
        <Switch>
            <Route exact={true} path="/" component={HomePage} />
            <Route component={PageNotFound} />
        </Switch>
    ) : (
        <Switch>
            <Route path="/register" component={RegistrationPage} />
            <Route path="/login" component={LoginPage} />
            <Redirect to="/login" />
        </Switch>
    );

export default Routes;
