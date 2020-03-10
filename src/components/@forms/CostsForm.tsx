import React from 'react';
import { Formik, Form, FormikValues } from 'formik';
import { validate } from '../../utils/validation';
import InputField from './InputField';
import SelectField from './SelectField/SelectField';
import Button from '../Button';

export interface InitValues {
    amount: number | null;
    category: string;
    tag: string;
    notes: string;
}

export interface CostsOption {
    label: string;
    value: string;
}

interface Props {
    initialValues: InitValues;
    onSubmit: (values: FormikValues) => void;
    options: CostsOption[] | null;
    tagOptions: CostsOption[] | null;
}

const CostsForm = ({ initialValues, onSubmit, options, tagOptions }: Props) => {
    return (
        <div className="costs-form">
            <Formik {...{ initialValues, validate, onSubmit }}>
                <Form>
                    <InputField name="amount" type="number" labelTitle="Price" required={true} />

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
