import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import Input from './Input';
import Label from './Label';

interface Props {
    labelTitle?: string;
    name: string;
    type: string;
    required?: boolean;
}

const InputField = ({ labelTitle, name, type, required }: Props) => {
    const customInput = ({ field, meta }: FieldProps) => {
        let className = '';
        if (meta.touched && meta.error) {
            className = 'is-invalid';
        }

        return <Input {...field} {...{ className, type }} />;
    };

    return (
        <div className="input-field">
            {labelTitle && <Label {...{ name, labelTitle, required }} />}
            <Field {...{ name }} render={customInput} />
            <ErrorMessage component="span" {...{ name }} />
        </div>
    );
};

export default InputField;
