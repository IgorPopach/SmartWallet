import React from 'react';

import CostsTable from './../../components/CostsTable';
import { readCosts, deleteCurrentCosts, updateCurrentCosts, CostDoc } from '../../api/costs';
import { StateProps, DispatchProps } from './MyCostsConnect';
import { DateTime } from 'luxon';

type Props = StateProps & DispatchProps;

const MyCosts = ({ user, createAlert }: Props) => {
    const [costs, setCosts] = React.useState(null);

    React.useEffect(() => {
        readCosts(user.uid)
            .then((allCosts) => {
                const sortedCosts = allCosts.sort(
                    (a, b) => DateTime.fromISO(b.createdAt).toMillis() - DateTime.fromISO(a.createdAt).toMillis(),
                );
                setCosts(sortedCosts);
            })
            .catch((err) => createAlert('Oops...', err.message, 'warning'));
    }, []);

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

    return <CostsTable {...{ costs, deleteCosts, updateCosts }} />;
};

export default MyCosts;
