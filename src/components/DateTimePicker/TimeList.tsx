import React from 'react';
import { DateTime } from 'luxon';

import { timeIntoString } from './Time';
import { TIME_TYPE } from './Time';

interface Time {
    hour: number;
    minute: number;
}

interface Props {
    type: typeof TIME_TYPE.HOUR | typeof TIME_TYPE.MINUTE;
    parsedData: DateTime;
    time: Time;
    updateData: (value: number) => void;
    updateTime: (newTime: Time) => void;
}

const TimeList = ({ type, parsedData, time, updateData, updateTime }: Props) => {
    const timeArr = React.useMemo(() => {
        if (type === TIME_TYPE.HOUR) {
            return new Array(24).fill(null).map((val, i) => i);
        }
        return new Array(60).fill(null).map((val, i) => i);
    }, []);

    const emptyItems = React.useMemo(() => new Array(2).fill(<div className="select-aria__item" />), []);

    const refs = React.useRef([]);
    if (refs.current.length !== timeArr.length) {
        refs.current = new Array(timeArr.length).fill(null).map((_, i) => refs.current[i] || React.createRef());
    }

    const list = React.useMemo(
        () =>
            timeArr.map((e, index) => {
                const handleClick = () => {
                    updateData(parsedData.set({ [type]: e }).toMillis());
                    updateTime({ ...time, [type]: e });
                    refs.current[e].current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                };
                return (
                    <div
                        className="select-aria__item"
                        ref={refs.current[e]}
                        key={index}
                        role="option"
                        aria-selected={e === time[type as keyof Time]}
                        onClick={handleClick}
                    >
                        {timeIntoString(e)}
                    </div>
                );
            }),
        [time],
    );

    React.useEffect(() => {
        refs.current[time[type as keyof Time]].current.scrollIntoView({
            block: 'center',
        });
    }, []);

    return (
        <div role="listbox" className="time-frame__listbox">
            <div className="select-aria">
                {emptyItems}
                {list}
                {emptyItems}
            </div>
        </div>
    );
};

export default TimeList;
