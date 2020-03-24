import { db } from './index';
import { BaseRecord, Period } from '../types';
import { toRecord, withID } from '../utils/firebase';

export function getUserCollection(userId: string, collectionName: string) {
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

function createNamedRecord(collectionName: string) {
    return <T extends object>(userId: string, name: string, data: T) =>
        getUserCollection(userId, collectionName)
            .doc(name)
            .set(toRecord(data))
            .then(() => readRecordById(collectionName)(userId, name));
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

function readAllRecords(collectionName: string) {
    return <T extends object>(userId: string) =>
        getUserCollection(userId, collectionName)
            .orderBy('date', 'desc')
            .get()
            .then<Array<T & BaseRecord>>((snapshot) => {
                const result: Array<T & BaseRecord> = [];
                snapshot.forEach((doc) => result.push(withID(doc)));
                return result;
            });
}

function readRecordsForPeriod(collectionName: string) {
    return <T extends object>(userId: string, period: Period) =>
        getUserCollection(userId, collectionName)
            .where('date', '>', period.from)
            .where('date', '<', period.to)
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
    createDocument: createNamedRecord(collectionName),
    read: readRecords(collectionName),
    readAll: readAllRecords(collectionName),
    readForPeriod: readRecordsForPeriod(collectionName),
    readById: readRecordById(collectionName),
    update: updateRecord(collectionName),
    delete: deleteRecord(collectionName),
});
