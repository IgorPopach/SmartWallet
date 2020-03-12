import firebase from 'firebase';

import { BaseRecord } from '../types';
import { now } from '../services/time';

type Snapshot<T> = firebase.firestore.DocumentSnapshot<T>;

export function toRecord<T extends object>(data: T) {
    type R = T & BaseRecord;
    const result = { ...data } as R;
    if ('createdAt' in result) {
        result.updatedAt = now<string>('string');
    } else {
        result.createdAt = now<string>('string');
        result.updatedAt = null;
    }
    return result;
}

export function withID<T extends BaseRecord>(doc: Snapshot<firebase.firestore.DocumentData>) {
    return { id: doc.id, ...doc.data() } as T;
}
