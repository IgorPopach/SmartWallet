import React, { useCallback } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import './../../styles/components/Snackbar';
import { AppState } from '../../store';
import { Message } from '../../store/snackbar/types';
import { deleteMessage } from '../../store/snackbar/actions';
import Alert from './Alert';

interface StateProps {
    messages: Message[],
    visible: boolean
}

type OnSubmitCallback = (id: string) => void

interface DispatchProps {
    submitAction: OnSubmitCallback
}

type Props = StateProps & DispatchProps

const Snackbar: React.FC<Props> = ({ messages, submitAction, visible }) => {

    const cls = visible? 'snackbar-show' : 'snackbar-hide';

    return (
        <div className={`snackbar ${cls}`}>
            {messages.map((mess) => <Alert key={mess.id} message={mess} onSubmit={submitAction} />)}
        </div>
    )
}

const mapStateToProps = (state: AppState): StateProps => ({
    messages: state.snackbar.messages,
    visible: state.snackbar.visible
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    submitAction: (id: string) => dispatch(deleteMessage(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);