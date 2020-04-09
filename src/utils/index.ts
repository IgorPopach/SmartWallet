import { Categories } from '../api/categories';

// tslint:disable:no-any
export function toClasses(classes: any[]): string {
    return classes.filter((name: any) => typeof name === 'string').join(' ');
}

export function onlyUnique(value: any, index: number, self: any[]) {
    return self.indexOf(value) === index;
}

export function toCategoriesList(categories: Categories): string[] {
    return Object.keys(categories).reduce((result, categoryGroupName) => {
        const groupCategories = [categoryGroupName];
        if (categories[categoryGroupName] && categories[categoryGroupName].length) {
            categories[categoryGroupName].forEach((subCategoryName) => {
                groupCategories.push(`${categoryGroupName}-${subCategoryName}`);
            });
        }
        return result.concat(groupCategories);
    }, [] as string[]);
}
