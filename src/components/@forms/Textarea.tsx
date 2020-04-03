import React from 'react';
import { toClasses } from '../../utils';

type Props = React.HTMLProps<HTMLTextAreaElement>;

const Textarea = ({ className, ...props }: Props) => {
    const classes = React.useMemo(() => toClasses([`form-control`, className]), [className]);
    return <textarea {...props} className={classes} />;
};

export default Textarea;
