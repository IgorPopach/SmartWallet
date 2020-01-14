import React, { FunctionComponent } from 'react';

import MainRouter from './../routes/MainRouter';
import SignIn from './SignIn';
import Home from './Home';


export interface AppProps {}

const App: FunctionComponent<AppProps> = () => 
    <>
        {/* <Home title={title} paragraph={paragraph} /> */}
        <MainRouter />
        <SignIn />
    </>

export default App;