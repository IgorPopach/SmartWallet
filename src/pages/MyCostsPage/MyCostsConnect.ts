import { connect } from 'react-redux';
import { User } from '../../types';
import { AppState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { addMessage } from '../../store/snackbar/actions';
import MyCosts from './MyCosts';

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

export default connect(mapStateToProps, mapDispatchToProps)(MyCosts);
