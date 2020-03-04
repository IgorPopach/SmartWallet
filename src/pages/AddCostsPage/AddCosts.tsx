import React from 'react';
import { Formik, Form, FormikValues } from 'formik';

import Button from '../../components/Button';
import { validate } from '../../utils/validation';
import InputField from './../../components/@forms/InputField';
import SelectField from '../../components/@forms/SelectField/SelectField';
import MyCosts from '../../components/MyCosts';

interface InitValues {
    price: number | null;
    category: string;
    tag: string;
    description: string;
}

const lastCosts = [
    {
        price: 10.0,
        category: 'car',
        tag: 'parts',
        description: 'wheels',
        date: '2020-01-25T09:08:34.123',
    },
    {
        price: 2.5,
        category: 'food',
        tag: '',
        description: 'bread, milk',
        date: '2020-02-10T09:08:34.123',
    },
    {
        price: 3.0,
        category: 'health',
        tag: 'sport',
        description: 'swimming pool',
        date: '2020-02-10T10:08:34.123',
    },
];

const options = [
    { label: 'Home', value: 'home' },
    { label: 'Car', value: 'car' },
    { label: 'Food', value: 'food' },
    { label: 'Health', value: 'health' },
];

const TagOptions = [
    { label: 'home', value: 'home' },
    { label: 'car', value: 'car' },
    { label: 'food', value: 'food' },
    { label: 'health', value: 'health' },
];

const initialValues: InitValues = { price: null, category: '', tag: '', description: '' };

const AddCoast = () => {
    const onSubmit = React.useCallback(({ price, category, tag, description }: FormikValues) => {
        console.log({
            price,
            category,
            tag,
            description,
        });
    }, []);

    return (
        <div className="add-costs">
            <Formik {...{ initialValues, validate, onSubmit }}>
                <Form>
                    <InputField name="price" type="number" labelTitle="Price" required={true} />

                    <SelectField
                        name="category"
                        options={options}
                        required={true}
                        labelTitle="Category"
                        selectType="select"
                    />

                    <SelectField name="tag" options={TagOptions} labelTitle="Tag" selectType="lookup" />

                    <InputField name="description" type="text" labelTitle="Description" />

                    <Button color="secondary" className="btn-sm" type="submit">
                        Save
                    </Button>
                </Form>
            </Formik>
            <hr />
            <h3>Last costs</h3>
            <MyCosts costs={lastCosts} />
        </div>
    );
};

export default AddCoast;
