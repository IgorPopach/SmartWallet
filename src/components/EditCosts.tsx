import React from 'react';
import CostsForm, { InitValues } from './@forms/CostsForm';
import { FormikValues } from 'formik';
import { CostDoc } from '../api/costs';

interface Props {
    currentCosts: CostDoc;
    updateCosts: (currentCosts: CostDoc) => void;
    closeEdit: () => void;
}

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

const EditCosts = ({ currentCosts, updateCosts, closeEdit }: Props) => {
    const initialValues = React.useMemo(
        () => ({
            amount: currentCosts.amount,
            category: currentCosts.category,
            tag: currentCosts.tag,
            notes: currentCosts.notes,
        }),
        [],
    );

    const onSubmit = React.useCallback(
        ({ amount, category, tag, notes }: FormikValues) => {
            updateCosts({
                ...currentCosts,
                amount,
                category,
                tag,
                notes,
            });
            closeEdit();
        },
        [currentCosts],
    );

    return (
        <div className="edit-costs">
            <CostsForm {...{ initialValues, onSubmit, options, tagOptions }} />
        </div>
    );
};

export default EditCosts;
