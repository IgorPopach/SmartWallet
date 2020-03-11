import React from 'react';

import { createCosts, readCosts, deleteCosts, updateCosts } from '../../api/costs';
import { StateProps, DispatchProps } from './AddCostsConnect';
import { DateTime } from 'luxon';
import CostsForm, { InitValues } from '../../components/@forms/CostsForm';
import { FormikValues } from 'formik';
import { CostRecord } from '../../types';
import CostsTable from '../../components/CostsTable';
import { onlyUnique } from '../../utils';
import { Spinner } from '../../components/Spinner';

type Props = StateProps & DispatchProps;

const AddCoast = ({ user, createAlert }: Props) => {
    const [costs, setCosts] = React.useState(null);
    const [costsData, setCostsData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        readCosts(user.uid)
            .then((allCosts) => {
                const options = allCosts
                    .map((everyCosts) => everyCosts.category)
                    .filter(onlyUnique)
                    .map((value) => ({
                        value,
                    }));
                const tagOptions = allCosts
                    .map((everyCosts) => everyCosts.tag)
                    .filter(onlyUnique)
                    .map((value) => ({
                        value,
                    }));
                setCosts(allCosts);
                setCostsData({ options, tagOptions });
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                createAlert('Oops...', err.message, 'warning');
            });
    }, []);

    const initialValues: InitValues = React.useMemo(
        () => ({
            value: null,
            category: '',
            tag: '',
            notes: '',
        }),
        [],
    );

    const onSubmit = React.useCallback(
        ({ value, category, tag, notes }: FormikValues) =>
            createCosts(user.uid, {
                value,
                category,
                tag,
                notes,
                date: null,
            })
                .then((res) => setCosts([res].concat(costs)))
                .then((res) => createAlert('Good job!', 'New costs added', 'success'))
                .catch((err) => createAlert(err.message, 'Oops...', 'warning')),
        [costs],
    );

    const removeCurrentCosts = React.useCallback(
        (currentCosts) => {
            deleteCosts(user.uid, currentCosts)
                .then((id) => setCosts((prevState: CostRecord[]) => prevState.filter((elem) => elem.id !== id)))
                .catch((err) => createAlert(err.message, 'Oops...', 'warning'));
        },
        [costs],
    );

    const updateCurrentCosts = React.useCallback(
        (currentCosts) => {
            updateCosts(user.uid, currentCosts)
                .then((updated) => {
                    setCosts((prevState: CostRecord[]) =>
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

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="add-costs">
            <CostsForm {...{ initialValues, onSubmit, costs, ...costsData }} />
            <div>
                <CostsTable {...{ costs, ...costsData, removeCurrentCosts, updateCurrentCosts }}>Last costs</CostsTable>
            </div>
        </div>
    );
};

export default AddCoast;
