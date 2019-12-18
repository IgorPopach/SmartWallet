import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './../styles/index.scss';

import App from './components/App.tsx';
import configureStore from './store/index.ts';

const store = configureStore();

const app = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App title="WellCome!" paragraph="Hello World!" />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app(store), document.getElementById("root"));