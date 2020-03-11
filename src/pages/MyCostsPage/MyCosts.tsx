import React from 'react';

import CostsTable from './../../components/CostsTable';
import { readCosts, deleteCosts, updateCosts } from '../../api/costs';
import { StateProps, DispatchProps } from './MyCostsConnect';
import { DateTime } from 'luxon';
import { onlyUnique } from '../../utils';
import { CostRecord } from '../../types';
import { Spinner } from '../../components/Spinner';

type Props = StateProps & DispatchProps;

const MyCosts = ({ user, createAlert }: Props) => {
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
                const sortedCosts = allCosts.sort(
                    (a, b) => DateTime.fromISO(b.createdAt).toMillis() - DateTime.fromISO(a.createdAt).toMillis(),
                );
                setCosts(sortedCosts);
                setCostsData({ options, tagOptions });
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                createAlert('Oops...', err.message, 'warning');
            });
    }, []);

    const removeCurrentCosts = React.useCallback(
        (currentCosts) => {
            deleteCosts(user.uid, currentCosts)
                .then((id) => setCostsData((prevState: CostRecord[]) => prevState.filter((elem) => elem.id !== id)))
                .catch((err) => createAlert(err.message, 'Oops...', 'warning'));
        },
        [costsData],
    );

    const updateCurrentCosts = React.useCallback(
        (currentCosts) => {
            updateCosts(user.uid, currentCosts)
                .then((updated) => {
                    setCostsData((prevState: CostRecord[]) =>
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
        [costsData],
    );

    if (isLoading) {
        return <Spinner />;
    }

    return <CostsTable {...{ costs, ...costsData, removeCurrentCosts, updateCurrentCosts }}>My costs</CostsTable>;
};

export default MyCosts;
