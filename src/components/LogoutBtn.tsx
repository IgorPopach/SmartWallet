import React from 'react';
import Button from './Button';

interface Props {
    onLogout: () => void;
}

const LogoutBtn = ({ onLogout }: Props) => {
    const handleLogout = React.useCallback(() => onLogout(), []);
    return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutBtn;
