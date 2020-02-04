import { connect } from 'react-redux';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';

import { addMessage } from '../../store/snackbar/actions';
import Home from './Home';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
        {
            createAlert: addMessage,
        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(Home);
