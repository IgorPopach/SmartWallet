import React from 'react';

import { toClasses } from '../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
}

const Button: React.FC<ButtonProps> = ({ className, color, children, ...shared }) => {
    if (!color) {
        color = 'primary';
    }
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
