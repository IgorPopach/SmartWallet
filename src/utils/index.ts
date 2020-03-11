// tslint:disable:no-any
export function toClasses(classes: any[]): string {
    return classes.filter((name: any) => !!name).join(' ');
}

export function onlyUnique(value: any, index: number, self: any[]) {
    return self.indexOf(value) === index;
}
