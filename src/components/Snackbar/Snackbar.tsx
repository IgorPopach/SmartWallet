import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import './../../styles/components/Snackbar.scss';
import { AppState } from '../../store';
import { Message } from '../../store/snackbar/types';
import { deleteMessage } from '../../store/snackbar/actions';
import Alert from './Alert';

interface StateProps {
    messages: Message[];
}

interface DispatchProps {
    closeAction: (id: string) => void;
}

type Props = StateProps & DispatchProps;

const Snackbar: React.FC<Props> = ({ messages, closeAction }) => {
    const alerts = messages.map((mess) => (
        <Alert key={mess.id} message={mess} onClose={closeAction} closeDelay={5000} />
    ));
    return <div className={`snackbar`}>{alerts}</div>;
};

const mapStateToProps = (state: AppState): StateProps => ({
    messages: state.snackbar.messages,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    closeAction: (id: string) => dispatch(deleteMessage(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
