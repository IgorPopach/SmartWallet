import React, { FunctionComponent } from 'react';

import { toClasses } from '../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
}

const Button: FunctionComponent<ButtonProps> = ({ className, color, children, ...shared }) => {
    const classes = React.useMemo(() => toClasses([`btn`, `btn-${color}`, className]), [color, className]);
    return (
        <button {...shared} className={classes}>
            {children}
        </button>
    );
};

Button.defaultProps = {
    type: 'button',
};

export default Button;
