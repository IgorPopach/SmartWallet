import { toCategoriesList, toClasses } from '../../src/utils';
import { Categories } from '../../src/api/categories';

describe('toCategoriesList', () => {
    const categories: Categories = {
        categoryName1: ['subCategoryOne', 'subCategoryTwo'],
        categoryName2: ['subCategoryOne'],
        categoryName3: [],
    };

    it('Should return correct categories list', () => {
        expect(toCategoriesList(categories)).toEqual([
            'categoryName1',
            'categoryName1-subCategoryOne',
            'categoryName1-subCategoryTwo',
            'categoryName2',
            'categoryName2-subCategoryOne',
            'categoryName3',
        ]);
    });
});

describe('toClasses', () => {
    const someFn = () => false;
    const list = ['className', true && 'someClassName', false, undefined, null, someFn, {}, []];

    it('Should return correct classes list', () => {
        expect(toClasses(list)).toBe('className someClassName');
    });
});
