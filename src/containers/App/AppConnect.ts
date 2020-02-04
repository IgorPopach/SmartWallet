import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { initializeSession } from '../../store/session/actions';
import { AppState } from '../../store';
import { App } from './App';
import { InitializeSessionStarts, InitializeSessionFinished } from '../../store/session/types';

const mapStateToProps = ({ session }: AppState) => ({
    user: session.user,
    isLoading: session.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch<InitializeSessionStarts | InitializeSessionFinished>) =>
    bindActionCreators(
        {
            initialize: initializeSession,
        },
        dispatch,
    );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
