import React from 'react';
import { Link } from 'react-router-dom';

import { User } from './../types/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faPlusCircle, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { PATH } from '../routes/path';

interface OwnProps {
    user: User;
}

type Props = OwnProps;

const Sidebar = ({ user }: Props) => {
    if (!user) {
        return null;
    }

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <span>
                        <FontAwesomeIcon icon={faChartLine} className="sidebar-icon" />
                    </span>
                    <Link to={PATH.DASHBOARD} className="sidebar-link">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <span>
                        <FontAwesomeIcon icon={faPlusCircle} className="sidebar-icon" />
                    </span>
                    <Link to={PATH.ADD_COSTS} className="sidebar-link">
                        Add costs
                    </Link>
                </li>
                <li>
                    <span>
                        <FontAwesomeIcon icon={faDollarSign} className="sidebar-icon" />
                    </span>
                    <Link to={PATH.MY_COSTS} className="sidebar-link">
                        My costs
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
