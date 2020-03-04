import { db } from '../firebase';
import { now } from '../services/time';

const COLLECTION_NAME = 'costs';

export interface Cost {
    value: number;
    category: string;
    user: string;
    tag?: string;
    notes?: string;
}

interface BaseDoc {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export type CostDoc = Cost & BaseDoc;

function toDoc<T extends object>(data: T) {
    type R = T & BaseDoc;
    const result = { ...data } as R;
    if ('createdAt' in result) {
        result.updatedAt = now();
    } else {
        result.createdAt = now();
        result.updatedAt = null;
    }
    return result;
}
function withID<T extends BaseDoc>(doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) {
    return { id: doc.id, ...doc.data() } as T;
}

const COSTS = db.collection(COLLECTION_NAME);

export const createCost = (cost: Cost) =>
    COSTS.add(toDoc(cost))
        .then((docRef) => docRef.get())
        .then((doc) => withID<CostDoc>(doc));

export const readCosts = (uid: string) =>
    COSTS.where('user', '==', uid)
        .get()
        .then((snapshot) => {
            const result: CostDoc[] = [];
            snapshot.forEach((doc) => result.push(withID(doc)));
            return result;
        });

export const updateCost = ({ id, ...cost }: CostDoc) =>
    COSTS.doc(id)
        .set(toDoc(cost))
        .then(() => COSTS.doc(id))
        .then((document) => document.get())
        .then((doc) => withID<CostDoc>(doc));

export const deleteCost = ({ id }: CostDoc) =>
    COSTS.doc(id)
        .delete()
        .then(() => id);
