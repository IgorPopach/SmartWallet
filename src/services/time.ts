import { DateTime } from 'luxon';

export function now<T extends number | string | DateTime>(format: 'string' | 'number' | 'luxon' = 'luxon') {
    switch (format) {
        case 'string':
            return DateTime.utc().toISO() as T;
        case 'number':
            return DateTime.utc().toMillis() as T;
        default:
            return DateTime.utc() as T;
    }
}

export function parse(time: number | string): DateTime {
    if (typeof time === 'number') {
        return DateTime.fromMillis(time);
    }
    return DateTime.local();
}

export function dateFormat(value: number | string, format: string) {
    return parse(value).toFormat(format);
}
