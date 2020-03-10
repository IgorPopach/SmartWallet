import React from 'react';

import MyCosts from '../../components/CostsTable';
import { createCosts, readCosts, deleteCurrentCosts, CostDoc, updateCurrentCosts } from '../../api/costs';
import { StateProps, DispatchProps } from './AddCostsConnect';
import { DateTime } from 'luxon';
import CostsForm, { InitValues } from '../../components/@forms/CostsForm';
import { FormikValues } from 'formik';

type Props = StateProps & DispatchProps;

const options = [
    { label: 'Home', value: 'home' },
    { label: 'Car', value: 'car' },
    { label: 'Food', value: 'food' },
    { label: 'Health', value: 'health' },
];

const tagOptions = [
    { label: 'home', value: 'home' },
    { label: 'car', value: 'car' },
    { label: 'food', value: 'food' },
    { label: 'health', value: 'health' },
];

const AddCoast = ({ user, createAlert }: Props) => {
    const [costs, setCosts] = React.useState(null);

    React.useEffect(() => {
        readCosts(user.uid)
            .then((allCosts) => {
                const lastCosts = allCosts.sort(
                    (a, b) => DateTime.fromISO(b.createdAt).toMillis() - DateTime.fromISO(a.createdAt).toMillis(),
                );
                setCosts(lastCosts);
            })
            .catch((err) => createAlert('Oops...', err.message, 'warning'));
    }, []);

    const initialValues: InitValues = React.useMemo(
        () => ({
            amount: null,
            category: '',
            tag: '',
            notes: '',
        }),
        [],
    );

    const onSubmit = React.useCallback(
        ({ amount, category, tag, notes }: FormikValues) =>
            createCosts({
                amount,
                category,
                tag,
                notes,
                user: user.uid,
            })
                .then((res) => setCosts([res].concat(costs)))
                .then((res) => createAlert('Good job!', 'New costs added', 'success'))
                .catch((err) => createAlert(err.message, 'Oops...', 'warning')),
        [costs],
    );

    const deleteCosts = React.useCallback(
        (currentCosts) => {
            deleteCurrentCosts(currentCosts)
                .then((id) => setCosts((prevState: CostDoc[]) => prevState.filter((elem) => elem.id !== id)))
                .catch((err) => createAlert(err.message, 'Oops...', 'warning'));
        },
        [costs],
    );

    const updateCosts = React.useCallback(
        (currentCosts) => {
            updateCurrentCosts(currentCosts)
                .then((updated) => {
                    setCosts((prevState: CostDoc[]) =>
                        prevState.map((e) => {
                            if (e.id === updated.id) {
                                return updated;
                            }
                            return e;
                        }),
                    );
                })
                .catch((err) => createAlert(err.message, 'Oops...', 'warning'));
        },
        [costs],
    );

    return (
        <div className="add-costs">
            <CostsForm {...{ initialValues, onSubmit, options, tagOptions }} />
            <div>
                <h3>Last costs</h3>
                <MyCosts {...{ costs, deleteCosts, updateCosts }} />
            </div>
        </div>
    );
};

export default AddCoast;
