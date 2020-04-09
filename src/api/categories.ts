import { db } from '../firebase';
import { toCategoriesList } from '../utils';

export interface Categories {
    [index: string]: string[];
}

export const readCategories = (userId: string) =>
    db
        .collection('categories')
        .get()
        .then((snapshot) => {
            const result: Categories[] = [];
            snapshot.forEach((doc) => result.push(doc.data()));
            return result[0];
        })
        .then(toCategoriesList);
