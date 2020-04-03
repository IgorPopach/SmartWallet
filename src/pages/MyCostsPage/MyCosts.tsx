import React from 'react';

import CostsTable from './../../components/CostsTable';
import { readCosts, deleteCosts, updateCosts } from '../../api/costs';
import { StateProps, DispatchProps } from './MyCostsConnect';
import { CostRecord } from '../../types';
import { Spinner } from '../../components/Spinner';

type Props = StateProps & DispatchProps;

const MyCosts = ({ user, createAlert }: Props) => {
    const [costs, setCosts] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        readCosts(user.uid)
            .then((allCosts) => {
                const sortedCosts = allCosts.sort((a, b) => b.date - a.date);
                setCosts(sortedCosts);
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

    return <CostsTable {...{ costs, removeCurrentCosts, updateCurrentCosts, user, createAlert }}>My costs</CostsTable>;
};

export default MyCosts;
