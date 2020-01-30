import React from 'react';

import { Message } from '../../store/snackbar/types';
import { CloseButton } from './CloseButton';

import './../../styles/components/Alert.scss';

interface Props {
    message: Message;
    onClose?: () => void;
    delay?: number;
}

function selfClose(closeAction: Props['onClose'], delay: number) {
    if (closeAction && delay) {
        return window.setTimeout(closeAction, delay + 1500);
    }
    return 0;
}

function playAnimation(setAnimationStyle: (style: string) => void, delay: number) {
    if (delay) {
        return window.setTimeout(() => {
            setAnimationStyle('hide');
        }, delay);
    }
    return 0;
}

const Alert = ({ message, onClose, delay }: Props) => {
    const [style, setStyle] = React.useState('show');

    const handleClick = () => {
        setStyle('hide');
        setTimeout(() => onClose(), 2000);
    };

    React.useEffect(() => {
        const timerAnimation = playAnimation(setStyle, delay);
        const timerSelfClose = selfClose(onClose, delay);
        return () => {
            clearTimeout(timerSelfClose);
            clearTimeout(timerAnimation);
        };
    }, []);

    return (
        <div className={`alert alert-${message.type} alert-${style}`}>
            <h2>{message.title}</h2>
            <p>{message.text}</p>
            {onClose && <CloseButton onClose={handleClick} />}
        </div>
    );
};

export default Alert;
