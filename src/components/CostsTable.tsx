import React from 'react';
import { DateTime } from 'luxon';
import { CostDoc } from '../api/costs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import EditCosts from './EditCosts';

interface Props {
    costs: CostDoc[] | null;
    deleteCosts: (currentCosts: CostDoc) => void;
    updateCosts: (updatedCosts: CostDoc) => void;
}

const CostsTable = ({ costs, deleteCosts, updateCosts }: Props) => {
    const [currentCosts, setCurrentCosts] = React.useState(null);

    const closeEdit = React.useCallback(() => {
        if (!currentCosts) {
            setCurrentCosts(null);
        }
    }, [currentCosts]);

    const renderTable = React.useCallback(
        () =>
            costs.map((elem, id) => {
                const { amount, createdAt, category, notes } = elem;
                const formatDate = DateTime.fromISO(createdAt).toLocaleString(DateTime.DATETIME_SHORT);
                const deleteClick = () => deleteCosts(elem);
                const updateClick = () => setCurrentCosts(elem);
                const control = (
                    <div className="my-costs-control">
                        <FontAwesomeIcon icon={faPencilAlt} onClick={updateClick} />
                        <FontAwesomeIcon icon={faTrashAlt} onClick={deleteClick} />
                    </div>
                );
                return (
                    <tr key={id}>
                        <td>{amount.toFixed(2)}</td>
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
        const { amount, createdAt, category, notes } = costs[0];
        const sortCosts = {
            amount,
            createdAt,
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
        <div className="my-costs">
            <table id="costs">
                <tbody>
                    {renderHeaderTable()}
                    {renderTable()}
                </tbody>
            </table>
            {currentCosts && <EditCosts {...{ updateCosts, currentCosts, closeEdit }} />}
        </div>
    );
};

export default CostsTable;
