import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

import Snackbar from '../Snackbar';
import usePrevious from '../../utils/usePrevious';
import { User } from '../../types/User';
import { initializeSession, logOut } from '../../store/session/actions';
import { Spinner } from '../../components/Spinner';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { PATH } from '../../routes/path';
import Routes from '../../routes/Routes';
import Sidebar from '../../components/Sidebar';
import ContentWrapper from '../../components/ContentWrapper';

interface OwnProps {
    history: History;
}

interface StateProps {
    isLoading: boolean;
    user: User | null;
}

interface DispatchProps {
    initialize: typeof initializeSession;
    logoutAction: typeof logOut;
}

type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps;

export const App: React.FC<Props> = ({ initialize, user, isLoading, history, logoutAction }) => {
    const prevUser = usePrevious(user);

    React.useEffect(() => {
        initialize();
    }, []);

    React.useEffect(() => {
        if (prevUser === null && !!user) {
            history.push(PATH.HOME);
        }
        if (!!prevUser && user === null) {
            history.push(PATH.LOGIN);
        }
    }, [user]);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <Header {...{ logoutAction, user }} />
            <Sidebar {...{ user }} />
            <ContentWrapper>
                <Routes />
            </ContentWrapper>
            <Footer />
            <Snackbar />
        </>
    );
};
