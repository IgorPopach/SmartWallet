import { db } from '../firebase';

interface Categories {
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
        });
