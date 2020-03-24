import React from 'react';
import CostsForm from './@forms/CostsForm';
import { FormikValues } from 'formik';
import { CostRecord, Option } from '../types';

interface Props<V> {
    currentCosts: CostRecord;
    updateCurrentCosts: (costs: CostRecord) => void;
    closeEdit: () => void;
    options: Array<Option<V>>;
    tagOptions: Array<Option<V>>;
}

// tslint:disable-next-line:no-any
const EditCosts = <V extends any>({ currentCosts, updateCurrentCosts, closeEdit, options, tagOptions }: Props<V>) => {
    const initialValues = React.useMemo(
        () => ({
            value: currentCosts.value,
            date: currentCosts.date,
            category: currentCosts.category,
            tag: currentCosts.tag,
            notes: currentCosts.notes,
        }),
        [],
    );

    const onSubmit = React.useCallback(
        ({ value, date, category, tag, notes }: FormikValues) => {
            updateCurrentCosts({
                ...currentCosts,
                value,
                date,
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
