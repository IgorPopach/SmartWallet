import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PATH } from './path';
import { User } from '../types/User';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import AddCosts from '../pages/AddCostsPage/AddCosts';
import PageNotFound from '../pages/PageNotFound';
import Profile from '../pages/Profile/';

interface Props {
    user: User | null;
}

const Routes = ({ user }: Props) =>
    user ? (
        <Switch>
            <Route exact={true} path={PATH.HOME} component={HomePage} />
            <Route path={PATH.ADD_COSTS} component={AddCosts} />
            <Route path={PATH.PROFILE} component={Profile} />
            {/* always at the End */}
            <Route component={PageNotFound} />
        </Switch>
    ) : (
        <Switch>
            <Route path={PATH.REGISTER} component={RegistrationPage} />
            <Route path={PATH.LOGIN} component={LoginPage} />
            <Redirect to={PATH.LOGIN} />
        </Switch>
    );

export default Routes;
