import React from 'react';
import Label from './Label';
import { Field, ErrorMessage, FieldProps } from 'formik';
import Textarea from './Textarea';

interface Props {
    labelTitle?: string;
    name: string;
    required?: boolean;
}

const TextareaField = ({ labelTitle, name, required }: Props) => {
    const customTextarea = ({ field, meta }: FieldProps) => {
        let className = '';
        if (meta.touched && meta.error) {
            className = 'is-invalid';
        }

        return <Textarea {...field} {...{ className }} />;
    };

    return (
        <div className="textarea-field">
            {labelTitle && <Label {...{ name, labelTitle, required }} />}
            <Field {...{ name }} render={customTextarea} />
            <ErrorMessage component="span" className="error-message" {...{ name }} />
        </div>
    );
};

export default TextareaField;
