// tslint:disable-next-line:no-any
export function toClasses(classes: any[]): string {
    // tslint:disable-next-line:no-any
    return classes.filter((name: any) => !!name).join(' ');
}
