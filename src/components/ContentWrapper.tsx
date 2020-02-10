import React from 'react';
import { User } from '../types/User';
import { toClasses } from '../utils';

interface Props {
    children: React.ReactNode;
    user: User;
}

const ContentWrapper = ({ children, user }: Props) => {
    const classes = React.useMemo(() => {
        const styles = [`content-wrapper`];
        if (user) {
            styles.push('active-sidebar');
        }
        return toClasses(styles);
    }, [user]);

    return <div className={classes}>{children}</div>;
};

export default ContentWrapper;
