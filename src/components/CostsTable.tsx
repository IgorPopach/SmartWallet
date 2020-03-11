import React, { ReactChildren } from 'react';
import { DateTime } from 'luxon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import EditCosts from './EditCosts';
import { CostRecord, Option } from '../types';

interface Props<V> {
    costs: CostRecord[] | null;
    removeCurrentCosts: (costs: CostRecord) => void;
    updateCurrentCosts: (costs: CostRecord) => void;
    options: Array<Option<V>>;
    tagOptions: Array<Option<V>>;
    children: ReactChildren;
}

// tslint:disable-next-line:no-any
const CostsTable = <V extends any>({
    costs,
    removeCurrentCosts,
    updateCurrentCosts,
    options,
    tagOptions,
    children,
}: Props<V>) => {
    const [currentCosts, setCurrentCosts] = React.useState(null);

    const summary = React.useMemo(() => costs.reduce((acc, current) => acc + current.value, 0), [costs]);

    const closeEdit = React.useCallback(() => {
        if (currentCosts) {
            setCurrentCosts(null);
        }
    }, [currentCosts]);

    const renderTable = React.useCallback(
        () =>
            costs.map((elem, id) => {
                const { value, createdAt, category, notes } = elem;
                const formatDate = DateTime.fromISO(createdAt).toLocaleString(DateTime.DATETIME_SHORT);
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
                        <td>{value.toFixed(2) || 0}</td>
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
        const { value, createdAt, category, notes } = costs[0];
        const sortCosts = {
            price: value,
            date: createdAt,
            category,
            description: notes,
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
            <table id="costs">
                <tbody>
                    {renderHeaderTable()}
                    {renderTable()}
                </tbody>
            </table>
            {currentCosts && <EditCosts {...{ updateCurrentCosts, currentCosts, closeEdit, options, tagOptions }} />}
        </div>
    );
};

export default CostsTable;
