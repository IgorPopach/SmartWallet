import React from 'react';
import { Formik, Form, FormikValues } from 'formik';

import { validate } from '../../utils/validation';
import InputField from './InputField';
import SelectField from './SelectField/SelectField';
import Button from '../Button';
import { Option } from './../../types';
import DateField from './DateField';

export interface InitValues {
    value: number | null;
    date: number;
    category: string;
    tag: string;
    notes: string;
}

interface Props<V> {
    initialValues: InitValues;
    onSubmit: (values: FormikValues) => void;
    options: Array<Option<V>> | null;
    tagOptions: Array<Option<V>> | null;
}

// tslint:disable-next-line:no-any
const CostsForm = <V extends any>({ initialValues, onSubmit, options, tagOptions }: Props<V>) => {
    return (
        <div className="costs-form">
            <Formik {...{ initialValues, validate, onSubmit }}>
                <Form>
                    <InputField name="value" type="number" labelTitle="Price" required={true} />

                    <DateField name="date" type="text" labelTitle="Date" required={true} />

                    <SelectField
                        name="category"
                        options={options}
                        required={true}
                        labelTitle="Category"
                        selectType="select"
                    />

                    <SelectField name="tag" options={tagOptions} labelTitle="Tag" selectType="lookup" />

                    <InputField name="notes" type="text" labelTitle="Notes" />

                    <Button color="secondary" className="btn-sm btn-costs" type="submit">
                        Save
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default CostsForm;
