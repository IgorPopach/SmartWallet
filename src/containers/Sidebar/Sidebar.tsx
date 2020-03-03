import React from 'react';
import { Link } from 'react-router-dom';

import { User } from '../../types/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faPlusCircle, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { PATH } from '../../routes/path';
import { toClasses } from '../../utils';
import { StateProps, DispatchProps } from './SidebarConnect';

interface OwnProps {
    user: User;
    isVisible: boolean;
}

type Props = OwnProps & StateProps & DispatchProps;

const Sidebar = ({ user, isVisible }: Props) => {
    const classes = React.useMemo(() => {
        const styles = ['sidebar'];
        if (!isVisible) {
            styles.push('hidden');
        }
        return toClasses(styles);
    }, [isVisible]);

    if (!user) {
        return null;
    }

    return (
        <div className={classes}>
            <div className="sidebar-wrapper">
                <ul>
                    <li>
                        <Link to={PATH.DASHBOARD} className="sidebar-link">
                            <i>
                                <FontAwesomeIcon icon={faChartLine} className="sidebar-icon" />
                            </i>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={PATH.ADD_COSTS} className="sidebar-link">
                            <i className="sidebar-icon">
                                <FontAwesomeIcon icon={faPlusCircle} className="sidebar-icon" />
                            </i>
                            <p>Add costs</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={PATH.MY_COSTS} className="sidebar-link">
                            <i className="sidebar-icon">
                                <FontAwesomeIcon icon={faDollarSign} />
                            </i>
                            <p>My costs</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
