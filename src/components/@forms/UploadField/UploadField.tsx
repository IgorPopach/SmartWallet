/* tslint:disable:jsx-no-lambda */
import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';

import Input from './../Input';
import UploadView from './UploadView';

interface Props {
    labelTitle: string;
    name: string;
    type: string;
    required?: boolean;
}

const UploadField = ({ labelTitle, name, type }: Props) => {
    const [uploadFile, setUploadFile] = React.useState(null);

    return (
        <div className="upload-field">
            <Field
                {...{ name }}
                render={({ field, meta }: FieldProps) => {
                    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
                        setUploadFile(target.files[0]);

                    const onClose = () => setUploadFile(null);

                    const view = !!uploadFile ? (
                        <UploadView {...{ uploadFile, onClose }} />
                    ) : (
                        <label htmlFor="select-image" className="btn btn-primary btn-upload">
                            {labelTitle}
                        </label>
                    );

                    const className = 'hidden';

                    return (
                        <>
                            <Input id="select-image" {...field} {...{ onChange, type, className }} />
                            {view}
                        </>
                    );
                }}
            />
            <ErrorMessage component="span" {...{ name }} />
        </div>
    );
};

export default UploadField;
