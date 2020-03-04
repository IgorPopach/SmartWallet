import { DateTime } from 'luxon';

export function now() {
    return DateTime.utc().toISO();
}
