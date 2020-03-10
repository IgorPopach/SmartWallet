import { connect } from 'react-redux';

import AddCosts from './AddCosts';
import { AppState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { User } from '../../types';
import { addMessage } from '../../store/snackbar/actions';

export interface StateProps {
    user: User | null;
}

export interface DispatchProps {
    createAlert: (messageText: string, title?: string, type?: string) => void;
}

const mapStateToProps = (state: AppState): StateProps => ({
    user: state.session.user,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
    bindActionCreators(
        {
            createAlert: addMessage,
        },
        dispatch,
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddCosts);
