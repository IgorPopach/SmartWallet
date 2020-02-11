import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PATH } from './path';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import AddCoast from '../pages/AddCostsPage/AddCosts';
import PageNotFound from '../pages/PageNotFound';
import { User } from '../types/User';

interface Props {
    user: User | null;
}

const Routes = ({ user }: Props) =>
    user ? (
        <Switch>
            <Route exact={true} path={PATH.HOME} component={HomePage} />
            <Route component={PageNotFound} />
            <Route path={PATH.ADD_COSTS} component={AddCoast} />
        </Switch>
    ) : (
        <Switch>
            <Route path={PATH.REGISTER} component={RegistrationPage} />
            <Route path={PATH.LOGIN} component={LoginPage} />
            <Redirect to={PATH.LOGIN} />
        </Switch>
    );

export default Routes;
