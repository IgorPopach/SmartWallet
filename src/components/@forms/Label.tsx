import React from 'react';

interface Props {
    name: string;
    labelTitle: string;
    required: boolean;
}

const Label = ({ name, labelTitle, required }: Props) => (
    <label htmlFor={name} className="label">
        {labelTitle}
        {required && <sup>*</sup>}
    </label>
);

export default Label;
