import React from 'react';

interface Props {
    onClose: () => void;
    classes: string;
}

export const CloseButton = ({ onClose, classes }: Props) => {
    return (
        <button type="button" className={classes} onClick={onClose}>
            <span aria-hidden="true">&times;</span>
        </button>
    );
};
