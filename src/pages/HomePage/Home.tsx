import React, { useCallback, useState } from 'react';

import Alert from '../../components/Alert/Alert';
import { Spinner } from '../../components/Spinner';
import LogoutBtn from '../../components/LogoutBtn';

interface DispatchProps {
    createAlert: (messageText: string, title?: string, type?: string) => void;
    logoutAction: () => void;
}

type Props = DispatchProps;

const Home = ({ createAlert, logoutAction }: Props) => {
    const [showAlert, setAlert] = useState(true);

    const newMessage = {
        messageText: 'this text you see in Alert',
        title: 'Title Alert',
        type: 'success',
    };

    const addMessageCallback = useCallback(
        () => createAlert('this text you see in Alert', 'Title Alert', 'success'),
        [],
    );

    const handleClose = useCallback(() => setAlert(false), []);

    return (
        <>
            <h2>Title Alert</h2>
            <p>{newMessage.messageText}</p>
            <button className="btn btn-danger" onClick={addMessageCallback}>
                Add this message
            </button>
            <LogoutBtn onLogout={logoutAction} />
            <Spinner />
            {/* alerts for presentation */}
            <Alert message={newMessage} delay={3000} />
            {showAlert && <Alert message={newMessage} onClose={handleClose} />}
        </>
    );
};

export default Home;
