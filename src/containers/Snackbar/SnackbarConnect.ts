import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Snackbar from './Snackbar';
import { AppState } from '../../store';
import { Message } from '../../store/snackbar/types';
import { deleteMessage } from '../../store/snackbar/actions';

interface StateProps {
    messages: Message[];
}

interface DispatchProps {
    closeAction: (id: string) => void;
}

const mapStateToProps = (state: AppState): StateProps => ({
    messages: state.snackbar.messages,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    closeAction: (id: string) => dispatch(deleteMessage(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
