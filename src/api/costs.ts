import { db } from '../firebase';
import { now } from '../services/time';

export interface Cost {
    value: number;
    category: string;
    date: number;
    tag?: string;
    notes?: string;
}

interface BaseDoc {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export type CostDoc = Cost & BaseDoc;

const COLLECTION_NAME = 'costs';

function toDoc<T extends object>(data: T) {
    type R = T & BaseDoc;
    const result = { ...data } as R;
    if ('createdAt' in result) {
        result.updatedAt = now<string>('string');
    } else {
        result.createdAt = now<string>('string');
        result.updatedAt = null;
    }
    return result;
}
function withID<T extends BaseDoc>(doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) {
    return { id: doc.id, ...doc.data() } as T;
}

const Records = db.collection('records');

export const initUserRecords = (userId: string) => Records.doc(userId).set({ costs: [], income: [] });

export const createCosts = (userId: string, cost: Cost) =>
    Records.doc(userId)
        .collection(COLLECTION_NAME)
        .add(toDoc(cost))
        .then((docRef) => docRef.get())
        .then((doc) => withID<CostDoc>(doc));

export const readCostsById = (userId: string, id: string) =>
    Records.doc(userId)
        .collection(COLLECTION_NAME)
        .doc(id);

export const readCosts = (userId: string, limit = 5) =>
    Records.doc(userId)
        .collection(COLLECTION_NAME)
        .limit(limit)
        .get()
        .then((snapshot) => {
            const result: CostDoc[] = [];
            snapshot.forEach((doc) => result.push(withID(doc)));
            return result;
        });

export const updateCosts = (userId: string, { id, ...cost }: CostDoc) =>
    Records.doc(userId)
        .collection(COLLECTION_NAME)
        .doc(id)
        .set(toDoc(cost))
        .then(() => readCostsById(userId, id))
        .then((document) => document.get())
        .then((doc) => withID<CostDoc>(doc));

export const deleteCosts = (userId: string, { id }: CostDoc) =>
    Records.doc(userId)
        .collection(COLLECTION_NAME)
        .doc(id)
        .delete()
        .then(() => id);
