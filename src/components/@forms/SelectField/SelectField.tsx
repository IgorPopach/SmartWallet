// tslint:disable:jsx-no-lambda
import React from 'react';
import { Field, FieldProps, ErrorMessage } from 'formik';

// import { Option } from '../../../types';
import Select from './Select';
import Label from './../Label';

interface Props<V> {
    labelTitle?: string;
    required?: boolean;
    name: string;
    options: V[];
    selectType?: string;
}

// tslint:disable-next-line:no-any
const SelectField = <V extends any>({ labelTitle, required, name, options, selectType }: Props<V>) => {
    const customSelect = ({ field, meta }: FieldProps) => (
        <Select
            {...{ options, selectType, meta }}
            onChange={(value) => {
                field.onChange({
                    target: {
                        name,
                        value,
                    },
                });
            }}
        />
    );

    return (
        <div className="select-field">
            <Label {...{ name, labelTitle, required }} />
            <Field {...{ name }} render={customSelect} />
            <ErrorMessage component="span" className="error-message" {...{ name }} />
        </div>
    );
};

export default SelectField;
