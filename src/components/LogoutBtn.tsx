import React from 'react';

interface Props {
    onLogout: () => void;
}

const LogoutBtn = ({ onLogout }: Props) => {
    const handleLogout = React.useCallback(() => onLogout(), [],);
    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutBtn;
