import { db } from './index';
import firebase from 'firebase';
import { BaseRecord } from '../types';
import { now } from '../services/time';

type Snapshot<T> = firebase.firestore.DocumentSnapshot<T>;

function toRecord<T extends object>(data: T) {
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

function withID<T extends BaseRecord>(doc: Snapshot<firebase.firestore.DocumentData>) {
    return { id: doc.id, ...doc.data() } as T;
}

function getUserCollection(userId: string, collectionName: string) {
    return db
        .collection('records')
        .doc(userId)
        .collection(collectionName);
}

function createRecord(collectionName: string) {
    return <T extends object>(userId: string, data: T) =>
        getUserCollection(userId, collectionName)
            .add(toRecord(data))
            .then((docRef) => docRef.get())
            .then<T & BaseRecord>((doc) => withID<T & BaseRecord>(doc));
}

function readRecords(collectionName: string) {
    return <T extends object>(userId: string, limit = 5) =>
        getUserCollection(userId, collectionName)
            .orderBy('date', 'desc')
            .limit(limit)
            .get()
            .then<Array<T & BaseRecord>>((snapshot) => {
                const result: Array<T & BaseRecord> = [];
                snapshot.forEach((doc) => result.push(withID(doc)));
                return result;
            });
}

function readRecordById(collectionName: string) {
    return <T extends object>(userId: string, id: string) =>
        getUserCollection(userId, collectionName)
            .doc(id)
            .get()
            .then<T & BaseRecord>((doc) => withID<T & BaseRecord>(doc));
}

function updateRecord(collectionName: string) {
    return <T extends BaseRecord>(userId: string, { id, ...rest }: T) =>
        getUserCollection(userId, collectionName)
            .doc(id)
            .set(toRecord(rest))
            .then<T & BaseRecord>(() => readRecordById(collectionName)(userId, id));
}

function deleteRecord(collectionName: string) {
    return <T extends BaseRecord>(userId: string, { id }: T) =>
        getUserCollection(userId, collectionName)
            .doc(id)
            .delete()
            .then<string>(() => id);
}

export default (collectionName: string) => ({
    create: createRecord(collectionName),
    read: readRecords(collectionName),
    readById: readRecordById(collectionName),
    update: updateRecord(collectionName),
    delete: deleteRecord(collectionName),
});
