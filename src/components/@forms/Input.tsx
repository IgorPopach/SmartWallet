import React from 'react';
import { toClasses } from '../../utils';

type Props = React.HTMLProps<HTMLInputElement>;

const Input = ({ className, ...props }: Props) => {
    const classes = React.useMemo(() => toClasses([`form-control`, className]), [className]);

    return <input {...props} className={classes} />;
};

Input.defaultProps = {
    type: 'text',
};

export default Input;
