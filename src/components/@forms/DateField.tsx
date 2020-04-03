import React from 'react';
import Label from './Label';
import { Field, ErrorMessage, FieldProps } from 'formik';
import Input from './Input';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import { dateFormat } from '../../services/time';

interface Props {
    labelTitle?: string;
    name: string;
    type: string;
    required?: boolean;
}

const DateField = ({ labelTitle, name, type, required }: Props) => {
    const [pickerOpen, setPickerOpen] = React.useState(false);

    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleClose = React.useCallback(() => setPickerOpen(false), []);
    const handleOpen = React.useCallback(() => setPickerOpen(true), []);

    const customInput = ({ field, meta }: FieldProps) => {
        setSelectedDate(field.value);
        const onChange = (value: number) => {
            field.onChange({
                target: {
                    name,
                    value,
                },
            });
            setSelectedDate(value);
        };
        let className = '';
        if (meta.touched && meta.error) {
            className = 'is-invalid';
        }

        return (
            <>
                <Input value={dateFormat(selectedDate, 'D, T')} {...{ className, type }} onClick={handleOpen} />
                <Input {...field} type="hidden" />
                {pickerOpen && (
                    <DateTimePicker {...{ handleClose, onChange }} date={selectedDate} className="date-field__picker" />
                )}
            </>
        );
    };

    return (
        <div className="date-field">
            {labelTitle && <Label {...{ name, labelTitle, required }} />}
            <Field {...{ name }} render={customInput} />
            <ErrorMessage component="span" className="error-message" {...{ name }} />
        </div>
    );
};

export default DateField;
