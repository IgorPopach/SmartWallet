import React from 'react';
import { parse } from '../../services/time';

interface Props {
    data: number;
    updateData: (value: number) => void;
}

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = ({ data, updateData }: Props) => {
    const parsedData = React.useMemo(() => parse(data), []);

    const [selectedDate, setSelectedDate] = React.useState(parsedData);

    const [date, setDate] = React.useState(selectedDate);

    const month = React.useMemo(() => date.month, [date]);
    const year = React.useMemo(() => date.year, [date]);

    const days = React.useMemo(() => {
        const offset = date.set({ day: 1 }).weekday;
        const daysArr = new Array(0).concat(new Array(offset - 1).fill(null));
        new Array(date.daysInMonth).fill(null).map((_, index) => daysArr.push(++index));
        return daysArr;
    }, [date]);

    const weeks = React.useMemo(
        () =>
            new Array(Math.ceil(days.length / 7)).fill(null).map((_, index) => days.slice(index * 7, (index + 1) * 7)),
        [date],
    );

    const tableBody = React.useMemo(
        () =>
            weeks.map((week, index) => (
                <tr key={index}>
                    {week.map((d, dIndex) => {
                        let styles = 'calendar-day';
                        if (d === null) {
                            return <td key={`${index} - ${dIndex}`}>{d}</td>;
                        }
                        if (d === selectedDate.day && month === selectedDate.month && year === selectedDate.year) {
                            styles = 'calendar-day is-selected';
                        }
                        const handleDayClick = () => {
                            setSelectedDate((prevState) => {
                                const updateDate = prevState.set({ day: d, month });
                                updateData(updateDate.toMillis());
                                return updateDate;
                            });
                        };
                        return (
                            <td key={`${index} - ${dIndex}`} className={styles} onClick={handleDayClick}>
                                {d}
                            </td>
                        );
                    })}
                </tr>
            )),
        [date],
    );

    const clickPrevMonth = React.useCallback(() => setDate((prevState) => prevState.minus({ month: 1 })), [date]);

    const clickNextMonth = React.useCallback(() => setDate((prevState) => prevState.plus({ month: 1 })), [date]);

    React.useEffect(() => {
        setDate(selectedDate);
    }, [selectedDate]);

    return (
        <>
            <div className="calendar-header">
                <div className="calendar-btn prev-month" onClick={clickPrevMonth}>
                    ◀
                </div>
                <div className="calendar-header-view">
                    {MONTHS[month - 1]} {year}
                </div>
                <div className="calendar-btn next-month" onClick={clickNextMonth}>
                    ▶
                </div>
            </div>
            <table className="calendar-body">
                <thead className="calendar-body__weeks">
                    <tr>
                        {DAYS_SHORT.map((d, id) => (
                            <th key={id}>{d}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="calendar-days">{tableBody}</tbody>
            </table>
        </>
    );
};

export default Calendar;
