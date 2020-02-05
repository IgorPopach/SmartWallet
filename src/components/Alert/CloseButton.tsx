import React from 'react';

interface Props {
    onClose: () => void;
}

export const CloseButton = ({ onClose }: Props) => {
    return (
        <button type="button" className="close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
        </button>
    );
};
