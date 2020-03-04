import React from 'react';
import { logOut } from '../store/session/actions';
import { User } from '../types/User';
import { Link } from 'react-router-dom';
import { PATH } from '../routes/path';
import Avatar from './Avatar';
import { toggleSidebar } from '../store/sidebar/actions';
import BurgerMenu from './BurgerMenu';

interface DispatchState {
    user: User;
    sidebarIsVisible: boolean;
}

interface DispatchProps {
    logoutAction: typeof logOut;
    toggleAction: typeof toggleSidebar;
}

type Props = DispatchState & DispatchProps;

export const Header = ({ logoutAction, user, toggleAction, sidebarIsVisible }: Props) => {
    const authBtn = React.useMemo(() => {
        if (!!user) {
            return (
                <div className="header-user">
                    <Link className="header-user-link" to={PATH.PROFILE}>
                        <span className="header-user-name">{user.displayName}</span>
                        <Avatar imageUrl={user.photoURL} />
                    </Link>
                    <Link to={PATH.HOME} className="logout" onClick={logoutAction}>
                        Logout
                    </Link>
                </div>
            );
        } else if (location.pathname === PATH.LOGIN) {
            return null;
        } else {
            return (
                <Link className="logIn" to={PATH.LOGIN}>
                    Sign In
                </Link>
            );
        }
    }, [user, location.pathname, logoutAction]);

    const control = React.useMemo(
        () => (
            <div className="header-control">
                <BurgerMenu {...{ toggleAction, sidebarIsVisible }} />
                <Link className="go-home" to={PATH.HOME}>
                    Smart Wallet
                </Link>
            </div>
        ),
        [sidebarIsVisible],
    );
    return (
        <div className="header">
            {control}
            {authBtn}
        </div>
    );
};
