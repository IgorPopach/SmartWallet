import React from 'react';
import { DateTime } from 'luxon';
import { Costs } from '../types';

interface Props {
    costs?: Costs[];
}

const myMockCosts = [
    {
        price: 10.0,
        category: 'car',
        tag: 'parts',
        description: 'wheels',
        date: '2020-01-25T09:08:34.123',
    },
    {
        price: 2.5,
        category: 'food',
        tag: '',
        description: 'bread, milk',
        date: '2020-02-10T09:08:34.123',
    },
    {
        price: 3.0,
        category: 'health',
        tag: 'sport',
        description: 'swimming pool',
        date: '2020-02-10T10:08:34.123',
    },
    {
        price: 10.0,
        category: 'enjoy',
        tag: 'sport',
        description: 'drag racing',
        date: '2020-02-15T12:00:00.000',
    },
];

const renderTable = (allCosts: Costs[]) =>
    allCosts.map((costs, id) => {
        const { price, date, category, description } = costs;
        const formatDate = DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_SHORT);
        return (
            <tr key={id}>
                <td>{price.toFixed(2)}</td>
                <td>{formatDate}</td>
                <td>{category}</td>
                <td>{description}</td>
            </tr>
        );
    });

const renderHeaderTable = (costs: Costs[]) => {
    const { price, date, category, description } = costs[0];
    const sortCosts = {
        price,
        date,
        category,
        description,
    };
    const headerKeys = Object.keys(sortCosts).map((key, id) => <th key={id}>{key}</th>);
    return <tr>{headerKeys}</tr>;
};

const MyCosts = ({ costs }: Props) => {
    if (!costs) {
        costs = myMockCosts;
    }
    return (
        <div className="my-costs">
            <table id="costs">
                <tbody>
                    {renderHeaderTable(costs)}
                    {renderTable(costs)}
                </tbody>
            </table>
        </div>
    );
};

export default MyCosts;
