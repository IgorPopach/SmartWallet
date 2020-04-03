import React, { useCallback } from 'react';

import { Option } from '../../../types';

interface Props<V> extends Option<V> {
    onClick: (value: V) => void;
}

// tslint:disable-next-line:no-any
const Item = <V extends any>({ value, onClick }: Props<V>) => {
    const handleClick = useCallback(() => onClick(value), [value]);

    return <li onClick={handleClick}>{value}</li>;
};

export default Item;
