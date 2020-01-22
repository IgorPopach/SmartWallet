import React from 'react';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import RegistrationForm from './Register/Form';
import { initializeSession } from '../store/session/actions';

interface DispatchProps {
    initialize: typeof initializeSession
}

interface OwnProps {
    title: string,
    paragraph: string,
}

type Props = DispatchProps & OwnProps;

const App: React.FC<Props> = ({ title, paragraph, initialize }) => {
    
    React.useEffect(() => {
        initialize();
    }, []);

    return (
        <div className="container-md app">
            <h2>{title}</h2>
            <p>{paragraph}</p>
            <FontAwesomeIcon icon={faCoffee} />
            <button className="btn btn-primary">Primary</button>
            <hr/>
            <RegistrationForm title="Register"/>
        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
    { initialize: initializeSession },
    dispatch,
)

export default connect(null, mapDispatchToProps)(App);