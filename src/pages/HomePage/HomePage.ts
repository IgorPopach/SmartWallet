import { connect } from 'react-redux';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';

import { addMessage } from '../../store/snackbar/actions';
import Home from './Home';
import { AppState } from '../../store';

const mapStateToProps = ({ session }: AppState) => ({ user: session.user });

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
        {
            createAlert: addMessage,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
