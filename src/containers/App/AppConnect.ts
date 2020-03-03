import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { initializeSession } from '../../store/session/actions';
import { AppState } from '../../store';
import { App } from './App';
import { InitializeSessionStarts, InitializeSessionFinished } from '../../store/session/types';
import { logOut } from '../../store/session/actions';
import { toggleSidebar } from '../../store/sidebar/actions';
import { SidebarActionTypes } from '../../store/sidebar/types';

const mapStateToProps = ({ session, sidebar }: AppState) => ({
    user: session.user,
    isLoading: session.isLoading,
    sidebarIsVisible: sidebar.isVisible,
});

const mapDispatchToProps = (
    dispatch: Dispatch<InitializeSessionStarts | InitializeSessionFinished | SidebarActionTypes>,
) =>
    bindActionCreators(
        {
            initialize: initializeSession,
            logoutAction: logOut,
            toggleAction: toggleSidebar,
        },
        dispatch,
    );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
