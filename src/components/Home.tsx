import React, { FunctionComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

export interface HomeProps {
    title: string,
    paragraph: string,
}

const Home: FunctionComponent<HomeProps> = ({ title, paragraph }) => (
    <div className="container-md app">
        <h2>{title}</h2>
        <p>{paragraph}</p>
        <FontAwesomeIcon icon={faCoffee} />
        <button className="btn btn-primary">Primary</button>
    </div>
);

export default Home;