import React from 'react';
import { parse } from '../../services/time';

interface Props {
    data: number;
    updateData: (value: number) => void;
}

const timeIntoString = (value: number) => ('0' + value).slice(-2);

const Time = ({ data, updateData }: Props) => {
    const parsedData = React.useMemo(() => parse(data), [data]);

    const [time, setTime] = React.useState({ hours: parsedData.hour, minutes: parsedData.minute });

    const hoursArr = React.useMemo(() => new Array(24).fill(null).map((val, i) => i), []);

    const minutesArr = React.useMemo(() => new Array(60).fill(null).map((val, i) => i), []);

    const refsHours = React.useRef([]);
    if (refsHours.current.length !== hoursArr.length) {
        refsHours.current = Array(hoursArr.length)
            .fill(null)
            .map((_, i) => refsHours.current[i] || React.createRef());
    }

    const refsMinutes = React.useRef([]);
    if (refsMinutes.current.length !== minutesArr.length) {
        refsMinutes.current = new Array(minutesArr.length)
            .fill(null)
            .map((_, i) => refsMinutes.current[i] || React.createRef());
    }

    const emptyItems = new Array(2).fill(<div className="select-aria__item" />);

    const hoursList = React.useMemo(
        () => (
            <div role="listbox" className="time-frame__listbox">
                <div className="select-aria">
                    {emptyItems}
                    {hoursArr.map((e, index) => {
                        const handleClick = () => {
                            updateData(parsedData.set({ hour: e }).toMillis());
                            setTime({ ...time, hours: e });
                            refsHours.current[e].current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                            });
                        };
                        return (
                            <div
                                className="select-aria__item"
                                ref={refsHours.current[e]}
                                key={index}
                                role="option"
                                aria-selected={e === time.hours}
                                onClick={handleClick}
                            >
                                {timeIntoString(e)}
                            </div>
                        );
                    })}
                    {emptyItems}
                </div>
            </div>
        ),
        [time],
    );

    const minutesList = React.useMemo(
        () => (
            <div role="listbox" className="time-frame__listbox">
                <div className="select-aria">
                    {emptyItems}
                    {minutesArr.map((e, index) => {
                        const handleClick = () => {
                            updateData(parsedData.set({ minute: e }).toMillis());
                            setTime({ ...time, minutes: e });
                            refsMinutes.current[e].current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                            });
                        };
                        return (
                            <div
                                className="select-aria__item"
                                ref={refsMinutes.current[e]}
                                key={index}
                                role="option"
                                aria-selected={e === time.minutes}
                                onClick={handleClick}
                            >
                                {timeIntoString(e)}
                            </div>
                        );
                    })}
                    {emptyItems}
                </div>
            </div>
        ),
        [time],
    );

    const displayHours = React.useMemo(() => timeIntoString(time.hours), [time.hours]);
    const displayMinutes = React.useMemo(() => timeIntoString(time.minutes), [time.minutes]);

    React.useEffect(() => {
        refsHours.current[time.hours].current.scrollIntoView({
            block: 'center',
        });

        refsMinutes.current[time.minutes].current.scrollIntoView({
            block: 'center',
        });
    }, []);

    return (
        <div className="time-frame">
            <div className="time-frame__showtime">
                {displayHours}:{displayMinutes}
            </div>
            <div className="time-frame__control">
                {hoursList}
                {minutesList}
            </div>
        </div>
    );
};

export default Time;
