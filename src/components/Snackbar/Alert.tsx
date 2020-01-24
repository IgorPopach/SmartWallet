import React, { useEffect, useState } from 'react';

import { Message } from './../../store/snackbar/types';

import './../../styles/components/Alert';

interface StateProps {
    message: Message;
    closeDelay: number;
}

interface OwnProps {
    onClose: (id: string) => void;
}

type Props = StateProps & OwnProps;

const Alert: React.FC<Props> = ({ message, onClose, closeDelay }) => {

    const [animationStyle, setAnimationStyle] = useState('show');

    const submitHandler = () => onClose(message.id);

    useEffect(() => {
        const timer = setTimeout(() => onClose(message.id), closeDelay);
        return () => clearTimeout(timer);
    },[]);

    useEffect(() => {
        const timer = setTimeout(() => setAnimationStyle('hide'), closeDelay - 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`alert alert-${message.type} alert-${animationStyle}`}>
            <p>
                <strong>{message.title}</strong>
            </p>
            <p>
                {message.text}
            </p>
            <button
                type="button"
                className="close"
                onClick={submitHandler}
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};

export default Alert;