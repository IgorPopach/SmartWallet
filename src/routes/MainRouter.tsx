import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './../components/Home';

const MainRouter = () => (
        <Switch>
            <Route exact={true} path="/" component={Home}/>
        </Switch>
)

export default MainRouter;