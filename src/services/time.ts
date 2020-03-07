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
