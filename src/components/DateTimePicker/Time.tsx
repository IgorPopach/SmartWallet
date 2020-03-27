import React from 'react';
import { parse } from '../../services/time';
import TimeList from './TimeList';

export const TIME_TYPE = {
    HOUR: 'hour',
    MINUTE: 'minute',
};

interface Props {
    data: number;
    updateData: (value: number) => void;
}

export const timeIntoString = (value: number) => ('0' + value).slice(-2);

const Time = ({ data, updateData }: Props) => {
    const parsedData = React.useMemo(() => parse(data), [data]);

    const [time, setTime] = React.useState({ hour: parsedData.hour, minute: parsedData.minute });

    const displayHours = React.useMemo(() => timeIntoString(time.hour), [time.hour]);
    const displayMinutes = React.useMemo(() => timeIntoString(time.minute), [time.minute]);

    const updateTime = React.useCallback((newTime) => setTime(newTime), []);

    return (
        <div className="time-frame">
            <div className="time-frame__showtime">
                {displayHours}:{displayMinutes}
            </div>
            <div className="time-frame__control">
                <TimeList {...{ parsedData, time, updateData, updateTime }} type={TIME_TYPE.HOUR} />
                <TimeList {...{ parsedData, time, updateData, updateTime }} type={TIME_TYPE.MINUTE} />
            </div>
        </div>
    );
};

export default Time;
