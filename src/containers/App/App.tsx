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
import Sidebar from '../Sidebar/';
import ContentWrapper from '../../components/ContentWrapper';
import { toggleSidebar } from '../../store/sidebar/actions';

interface OwnProps {
    history: History;
}

interface StateProps {
    isLoading: boolean;
    user: User | null;
    sidebarIsVisible: boolean;
}

interface DispatchProps {
    initialize: typeof initializeSession;
    logoutAction: typeof logOut;
    toggleAction: typeof toggleSidebar;
}

type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps;

export const App: React.FC<Props> = ({
    initialize,
    user,
    isLoading,
    history,
    logoutAction,
    sidebarIsVisible,
    toggleAction,
}) => {
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

    // if (isLoading) {
    //     return <Spinner />;
    // }
    return (
        <div className="app">
            <Header {...{ logoutAction, user, sidebarIsVisible, toggleAction }} />
            <Sidebar {...{ user }} />
            <ContentWrapper {...{ user, sidebarIsVisible }}>
                {isLoading && <Spinner />}
                <Routes {...{ user }} />
            </ContentWrapper>
            <Footer />
            <Snackbar />
        </div>
    );
};
