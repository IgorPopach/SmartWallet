import React, { FunctionComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

export interface AppProps {
    title: string,
    paragraph: string,
}

const App: FunctionComponent<AppProps> = ({ title, paragraph }) => 
        <div className="container-md app">
            <h2>{title}</h2>
            <p>{paragraph}</p>
            <FontAwesomeIcon icon={faCoffee} />
            <button className="btn btn-primary">Primary</button>
        </div>

export default App;