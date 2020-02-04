import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

import Snackbar from '../Snackbar';
import MainRouter from '../../routes/MainRouter';
import usePrevious from '../../utils/usePrevious';
import { ROUTES } from '../../routes/routes';
import { User } from '../../types/User';
import { initializeSession } from '../../store/session/actions';
import { Spinner } from '../../components/Spinner';

interface OwnProps {
    history: History;
}

interface StateProps {
    isLoading: boolean;
    user: User | null;
}

interface DispatchProps {
    initialize: typeof initializeSession;
}

type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps;

export const App: React.FC<Props> = ({ initialize, user, isLoading, history }) => {
    const prevUser = usePrevious(user);

    React.useEffect(() => {
        initialize();
    }, []);

    React.useEffect(() => {
        if (prevUser === null && !!user) {
            history.push(ROUTES.HOME);
        }
        if (!!prevUser && user === null) {
            history.push(ROUTES.LOGIN);
        }
    }, [user]);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className="container-md app">
            <MainRouter />
            <Snackbar />
        </div>
    );
};
