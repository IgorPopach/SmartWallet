import React, { useCallback } from 'react';

import { Option } from '../../../types';

interface Props<V> extends Option<V> {
    onClick: ({ label, value }: Option<V>) => void;
}

// tslint:disable-next-line:no-any
const Item = <V extends any>({ label, value, onClick }: Props<V>) => {
    const handleClick = useCallback(() => onClick({ label, value }), [{ label, value }]);

    return <li onClick={handleClick}>{label}</li>;
};

export default Item;
