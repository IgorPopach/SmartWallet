import React from 'react';
import LogoutBtn from './LogoutBtn';
import { logOut } from '../store/session/actions';
import { User } from '../types/User';
import { Link } from 'react-router-dom';
import { PATH } from '../routes/path';

interface DispatchState {
    user: User;
}

interface DispatchProps {
    logoutAction: typeof logOut;
}

type Props = DispatchState & DispatchProps;

export const Header = ({ logoutAction, user }: Props) => {
    const authBtn = React.useMemo(
        () => (!!user ? <LogoutBtn onLogout={logoutAction} /> : <Link to={PATH.LOGIN}>Log In</Link>),
        [user],
    );
    return (
        <div className="header">
            <h2>HEADER</h2>
            {authBtn}
        </div>
    );
};
