import React from 'react';

import Calendar from './Calendar';
import Time from './Time';
import { now } from '../../services/time';
import { toClasses } from '../../utils';

interface Props {
    date?: number;
    handleClose?: () => void;
    onChange: (value: number) => void;
    className?: string;
}

const DateTimePicker = ({ date, handleClose, onChange, className }: Props) => {
    const [tab, setTab] = React.useState(0);
    const [data, setData] = React.useState(date || (now('number') as number));

    const styles = React.useMemo(() => toClasses(['datetime__frame'].concat(className)), [className]);

    const handleDateClick = React.useCallback(() => setTab(0), []);
    const handleTimeClick = React.useCallback(() => setTab(1), []);

    const dateButton = React.useMemo(() => {
        if (tab === 0) {
            return 'datetime_btn is-active';
        }
        return 'datetime_btn';
    }, [tab]);

    const timeButton = React.useMemo(() => {
        if (tab === 1) {
            return 'datetime_btn is-active';
        }
        return 'datetime_btn';
    }, [tab]);

    const updateData = React.useCallback((value) => {
        setData(value);
        return onChange(value);
    }, []);

    const toggleComponent = React.useMemo(() => {
        if (tab === 1) {
            return <Time {...{ data, updateData }} />;
        }
        return <Calendar {...{ data, updateData }} />;
    }, [tab, data]);

    // const handleSubmit = React.useCallback(() => {
    //   onChange(data);
    //   handleClose();
    // }, [data]);

    return (
        <div className={styles}>
            <div className="datetime__control">
                <div className={dateButton} {...{ updateData }} onClick={handleDateClick}>
                    Date
                </div>
                <div className={timeButton} onClick={handleTimeClick}>
                    Time
                </div>
            </div>
            <div className="datetime__body">{toggleComponent}</div>
            <div className="datetime_submit_btn" onClick={handleClose}>
                Set
            </div>
        </div>
    );
};

export default DateTimePicker;
