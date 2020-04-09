import React from 'react';
import CostsForm from './@forms/CostsForm';
import { FormikValues } from 'formik';
import { CostRecord, User } from '../types';

interface Props<V> {
    currentCosts: CostRecord;
    updateCurrentCosts: (costs: CostRecord) => void;
    closeEdit: () => void;
    user: User | null;
    createAlert: (messageText: string, title?: string, type?: string) => void;
}

// tslint:disable-next-line:no-any
const EditCosts = <V extends any>({ currentCosts, updateCurrentCosts, closeEdit, user, createAlert }: Props<V>) => {
    const initialValues = React.useMemo(() => {
        const { value, date, category, tag, notes } = currentCosts;
        return {
            value,
            date,
            category,
            tag,
            notes,
        };
    }, []);

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
            <CostsForm {...{ initialValues, onSubmit, user, createAlert }} />
        </div>
    );
};

export default EditCosts;
