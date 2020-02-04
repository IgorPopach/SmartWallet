import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../routes/path';

export const Footer = () => {
    return (
        <div className="footer">
            <h1>FOOTER</h1>
            <Link to={PATH.HOME}>Home</Link>
        </div>
    );
};
