import React from 'react';
import { Formik, Form, FormikValues } from 'formik';

import { validate } from '../../utils/validation';
import InputField from './InputField';
import SelectField from './SelectField/SelectField';
import Button from '../Button';
import DateField from './DateField';
import { User } from './../../types';
import { readCategories } from '../../api/categories';
import TextareaField from './TextareaField';

export interface InitValues {
    price: number | null;
    date: number;
    category: string;
    tag: string;
    notes: string;
}

interface Props {
    initialValues: InitValues;
    onSubmit: (values: FormikValues) => void;
    user: User | null;
    createAlert: (messageText: string, title?: string, type?: string) => void;
}

const tagOptions = ['food', 'car', 'sport', 'music'];

// tslint:disable-next-line:no-any
const CostsForm = ({ initialValues, onSubmit, user, createAlert }: Props) => {
    const [categories, setCategories] = React.useState(['...loading']);

    React.useEffect(() => {
        readCategories(user.uid)
            .then((data) => setCategories(data))
            .catch((err) => createAlert(err.message, 'Oops...', 'warning'));
    }, []);
    return (
        <Formik {...{ initialValues, validate, onSubmit }}>
            <Form className="costs-form">
                <InputField name="price" type="number" labelTitle="Price" required={true} />

                <DateField name="date" type="text" labelTitle="Date" required={true} />

                <SelectField
                    name="category"
                    options={categories}
                    required={true}
                    labelTitle="Category"
                    selectType="select"
                />

                <SelectField name="tag" options={tagOptions} labelTitle="Tag" selectType="lookup" />

                <TextareaField name="notes" labelTitle="Notes" />

                <Button color="secondary" className="btn-sm btn-costs" type="submit">
                    Save
                </Button>
            </Form>
        </Formik>
    );
};

export default CostsForm;
