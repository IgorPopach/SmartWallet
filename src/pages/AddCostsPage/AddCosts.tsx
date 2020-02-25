import React from 'react';
import { Formik, Form, FormikValues, Field } from 'formik';

import Button from '../../components/Button';
import { validate } from '../../utils/validation';
import { DateTime } from 'luxon';
import InputField from '../../components/@forms/InputField';
import SelectField from '../../components/@forms/SelectField/SelectField';

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

const renderTable = () =>
    lastCosts.map((costs, id) => {
        const { price, date, category, description } = costs;
        const formatDate = DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_SHORT);
        return (
            <tr key={id}>
                <td>{price.toFixed(2)}</td>
                <td>{formatDate}</td>
                <td>{category}</td>
                <td>{description}</td>
            </tr>
        );
    });

const renderHeaderTable = () => {
    const { price, date, category, description } = lastCosts[0];
    const sortCosts = {
        price,
        date,
        category,
        description,
    };
    const headerKeys = Object.keys(sortCosts).map((key, id) => <th key={id}>{key}</th>);
    return <tr>{headerKeys}</tr>;
};

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
                        onChange={console.log}
                        required={true}
                        labelTitle="Category"
                    >
                        <Field />
                    </SelectField>

                    <SelectField
                        name="tag"
                        options={TagOptions}
                        onChange={console.log}
                        labelTitle="Tag"
                        selectType="input"
                    >
                        <Field />
                    </SelectField>

                    <InputField name="description" type="text" labelTitle="Description" />

                    <Button color="primary" className="btn-sm" type="submit">
                        Save
                    </Button>
                </Form>
            </Formik>
            <hr />
            <h3>Last costs</h3>
            <div className="last-costs">
                <table id="costs">
                    <tbody>
                        {renderHeaderTable()}
                        {renderTable()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddCoast;
