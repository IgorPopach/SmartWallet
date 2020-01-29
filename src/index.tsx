import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/index.scss';
import App from './components/App';
import configureStore from './store/index';

const store = configureStore();

const getApp = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
render(getApp(), document.getElementById('root'));
