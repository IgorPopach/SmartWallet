import React, { useCallback } from 'react';

interface DispatchProps {
    createAlert: (messageText: string, title?: string, type?: string) => void;
}

type Props = DispatchProps;

const Home = ({ createAlert }: Props) => {
    const newMessage = {
        messageText: 'this text you see in Alert',
        title: 'Title Alert',
        type: 'success',
    };

    const addMessageCallback = useCallback(
        () => createAlert('this text you see in Alert', 'Title Alert', 'success'),
        [],
    );

    return (
        <>
            <h2>Title Alert</h2>
            <p>{newMessage.messageText}</p>
            <button className="btn btn-danger" onClick={addMessageCallback}>
                Add this message
            </button>
        </>
    );
};

export default Home;
