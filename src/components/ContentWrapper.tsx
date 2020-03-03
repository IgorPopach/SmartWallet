import React from 'react';
import { User } from '../types/User';
import { toClasses } from '../utils';

interface Props {
    children: React.ReactNode;
    user: User;
    sidebarIsVisible: boolean;
}

const ContentWrapper = ({ children, user, sidebarIsVisible }: Props) => {
    const classes = React.useMemo(() => {
        const styles = [`content-wrapper`];
        if (user && sidebarIsVisible) {
            styles.push('sidebar-visible');
        } else if (user && !sidebarIsVisible) {
            styles.push('sidebar-hidden');
        }
        return toClasses(styles);
    }, [user, sidebarIsVisible]);

    return <div className={classes}>{children}</div>;
};

export default ContentWrapper;
