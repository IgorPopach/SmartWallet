// tslint:disable: jsx-no-lambda
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PATH } from './path';
import { User } from '../types/User';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import AddCosts from '../pages/AddCostsPage';
import PageNotFound from '../pages/PageNotFound';
import Profile from './../pages/Profile/';
import MyCosts from '../pages/MyCostsPage/';

interface Props {
    user: User | null;
}

const Routes = ({ user }: Props) =>
    user ? (
        <Switch>
            <Route exact={true} path={PATH.HOME} component={HomePage} />
            <Route path={PATH.ADD_COSTS} component={AddCosts} />
            <Route path={PATH.PROFILE} component={Profile} />
            <Route path={PATH.MY_COSTS} component={MyCosts} />
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
