import React from 'react';
import LogoutBtn from './LogoutBtn';

interface DispatchProps {
    logoutAction: () => void;
}

export const Header = ({ logoutAction }: DispatchProps) => {
    return (
        <div className="header">
            <h1>HEADER</h1>
            <LogoutBtn onLogout={logoutAction} />
        </div>
    );
};
