import React, { InputHTMLAttributes, FunctionComponent, ChangeEvent } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange(value: boolean): void
}

const Checkbox: FunctionComponent<CheckboxProps> = ({ children, onChange, ...shared }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked);

    return <input onChange={handleChange} {...shared} >{children}</input>
    
}

Checkbox.defaultProps = {
    type: 'checkbox'
}

export default Checkbox;