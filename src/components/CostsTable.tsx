import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import EditCosts from './EditCosts';
import { CostRecord, User } from '../types';
import { dateFormat } from '../services/time';

interface Props<V> {
    costs: CostRecord[] | null;
    removeCurrentCosts: (costs: CostRecord) => void;
    updateCurrentCosts: (costs: CostRecord) => void;
    children: string;
    user: User | null;
    createAlert: (messageText: string, title?: string, type?: string) => void;
}

// tslint:disable-next-line:no-any
const CostsTable = <V extends any>({
    costs,
    removeCurrentCosts,
    updateCurrentCosts,
    children,
    user,
    createAlert,
}: Props<V>) => {
    const [currentCosts, setCurrentCosts] = React.useState(null);

    const summary = React.useMemo(() => costs.reduce((acc, current) => acc + current.price, 0), [costs]);

    const closeEdit = React.useCallback(() => {
        if (currentCosts) {
            setCurrentCosts(null);
        }
    }, [currentCosts]);

    const renderTable = React.useCallback(
        () =>
            costs.map((elem, id) => {
                const { price, date, category, notes } = elem;
                const formatDate = date ? dateFormat(date, 'D, T') : null;
                const deleteClick = () => removeCurrentCosts(elem);
                const updateClick = () => setCurrentCosts(elem);
                const control = (
                    <div className="costs-table__control">
                        <FontAwesomeIcon icon={faPencilAlt} onClick={updateClick} />
                        <FontAwesomeIcon icon={faTrashAlt} onClick={deleteClick} />
                    </div>
                );
                return (
                    <tr key={id}>
                        <td>{(price !== undefined && price.toFixed(2)) || 0}</td>
                        <td>{formatDate}</td>
                        <td>{category}</td>
                        <td>{notes}</td>
                        <td>{control}</td>
                    </tr>
                );
            }),
        [costs],
    );

    const renderHeaderTable = React.useCallback(() => {
        if (costs.length === 0) {
            return null;
        }
        const { price, date, category, notes } = costs[0];
        const sortCosts = {
            price,
            date,
            category,
            notes,
        };
        const headerKeys = Object.keys(sortCosts).map((key, id) => <th key={id}>{key}</th>);
        return (
            <tr>
                {headerKeys}
                <th />
            </tr>
        );
    }, [costs]);

    if (!costs) {
        return <p>No costs</p>;
    }

    return (
        <div className="costs-table">
            <div className="costs-table__header">
                <h2 className="costs-table__name">{children}</h2>
                <span className="costs-table__summary">{summary.toFixed(2)}</span>
            </div>
            <table className="costs-table__body">
                <tbody>
                    {renderHeaderTable()}
                    {renderTable()}
                </tbody>
            </table>
            {currentCosts && <EditCosts {...{ updateCurrentCosts, currentCosts, closeEdit, user, createAlert }} />}
        </div>
    );
};

export default CostsTable;
