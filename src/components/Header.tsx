import React from 'react';
import LogoutBtn from './LogoutBtn';
import { logOut } from '../store/session/actions';
import { User } from '../types/User';
import { Link } from 'react-router-dom';
import { PATH } from '../routes/path';
import Avatar from './Avatar';

interface DispatchState {
    user: User;
}

interface DispatchProps {
    logoutAction: typeof logOut;
}

type Props = DispatchState & DispatchProps;

export const Header = ({ logoutAction, user }: Props) => {
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
    return (
        <div className="header">
            <Link className="go-home" to={PATH.HOME}>
                Smart Wallet
            </Link>
            {authBtn}
        </div>
    );
};
