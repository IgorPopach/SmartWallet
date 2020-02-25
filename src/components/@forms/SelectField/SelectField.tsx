import React from 'react';

import { Option } from '../../../types';
import Select from './Select';
import { ErrorMessage } from 'formik';

interface Props<V> {
    labelTitle?: string;
    required?: boolean;
    name: string;
    options: Array<Option<V>>;
    onChange: (value: V) => void;
    selectType?: string;
    children: HTMLElement | React.ReactElement<V>;
}

// tslint:disable-next-line:no-any
const SelectField = <V extends any>({
    labelTitle,
    required,
    name,
    options,
    onChange,
    selectType,
    children,
}: Props<V>) => {
    const label = (
        <label htmlFor={name} className="label">
            {labelTitle}
            {required && <sup>*</sup>}
        </label>
    );

    return (
        <div className="select-field">
            {label}
            <Select {...{ name, options, onChange, selectType }}>{children}</Select>
            <ErrorMessage component="span" {...{ name }} />
        </div>
    );
};

export default SelectField;
