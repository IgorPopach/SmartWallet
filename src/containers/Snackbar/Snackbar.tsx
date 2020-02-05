import React from 'react';

import './../../styles/components/Snackbar.scss';
import { Message } from '../../store/snackbar/types';
import Alert from '../../components/Alert/Alert';

interface StateProps {
    messages: Message[];
}

interface DispatchProps {
    closeAction: (id: string) => void;
}

type Props = StateProps & DispatchProps;

const Snackbar: React.FC<Props> = ({ messages, closeAction }) => {
    const alerts = messages.map((mess) => {
        const closeCallback = () => closeAction(mess.id);
        return <Alert key={mess.id} message={mess} onClose={closeCallback} delay={15000} />;
    });
    return <div className={`snackbar`}>{alerts}</div>;
};

export default Snackbar;
