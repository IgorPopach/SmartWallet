import React, { FunctionComponent } from 'react';
import { toClasses } from '../../utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    autofocus?: boolean;
}

const Input: FunctionComponent<InputProps> = ({ className, ...shared }) => {
    const classes = React.useMemo(() => toClasses([`form-control`, className]), [className]);

    return <input {...shared} className={classes} />;
};

Input.defaultProps = {
    type: 'text',
    autofocus: false,
};

export default Input;
