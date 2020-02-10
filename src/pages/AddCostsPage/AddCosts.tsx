import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik';

import Button from '../../components/Button';
import { validate } from '../../utils/validation';
import { DateTime } from 'luxon';

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
                <Form className="">
                    <label htmlFor="price">
                        Price<sup>*</sup>
                    </label>
                    <Field name="price" type="number" />
                    <ErrorMessage component="span" name="price" />

                    <label htmlFor="category">
                        Category<sup>*</sup>
                    </label>
                    <Field as="select" name="category">
                        <option disabled={true} value="">
                            Select category
                        </option>
                        <option value="home">Home</option>
                        <option value="car">Car</option>
                        <option value="food">Food</option>
                        <option value="health">Health</option>
                    </Field>
                    <ErrorMessage component="span" name="category" />

                    <label htmlFor="tag">Tag</label>
                    <Field name="tag" type="text" />
                    <ErrorMessage component="span" name="tag" />

                    <label htmlFor="description">Description</label>
                    <Field name="description" type="text" />
                    <ErrorMessage component="span" name="description" />

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
