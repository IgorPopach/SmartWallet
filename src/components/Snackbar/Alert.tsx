import React, { useCallback } from 'react';

import { Message } from './../../store/snackbar/types';

import './../../styles/components/Alert';

interface Props {
    message: Message,
    onSubmit: (id: string) => void
}

const Alert: React.FC<Props> = ({ message, onSubmit }) => {

    const submitHandler = () => onSubmit(message.id)

    return (
        <div className={`alert alert-${message.type}`}>
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
    )
}

export default Alert;