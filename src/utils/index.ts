export function toClasses(classes: any[]): string {
    return classes.filter((name: any) => !!name).join(' ');
}
