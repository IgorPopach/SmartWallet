import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';

import Input from './../Input';

interface Props {
    labelTitle?: string;
    name: string;
    type: string;
    required?: boolean;
}

const UploadField = ({ labelTitle, name, type, required }: Props) => {
    const label = (
        <label htmlFor={name} className="label">
            {labelTitle}
            {required && <sup>*</sup>}
        </label>
    );

    const customInput = ({ field, meta }: FieldProps) => {
        let className = '';
        if (meta.touched && meta.error) {
            className = 'is-invalid';
        }

        return <Input {...field} {...{ className, type }} />;
    };

    return (
        <div className="upload-field">
            {labelTitle && label}
            <Field {...{ name }} render={customInput} />
            <ErrorMessage component="span" {...{ name }} />
        </div>
    );
};

export default UploadField;
