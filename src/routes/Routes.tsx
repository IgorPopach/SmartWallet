import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PATH } from './path';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import AddCoast from '../pages/AddCostsPage/AddCosts';

const Routes = () => (
    <Switch>
        <Route exact={true} path={PATH.HOME} component={HomePage} />
        <Route path={PATH.LOGIN} component={LoginPage} />
        <Route path={PATH.REGISTER} component={RegistrationPage} />
        <Route path={PATH.ADD_COSTS} component={AddCoast} />
    </Switch>
);

export default Routes;
