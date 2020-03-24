export * from './User';
export interface Option<V> {
    label: string;
    value: V;
}

export interface Costs {
    price: number;
    category: string;
    tag: string;
    description: string;
    date: string;
}
export * from './Records';
export * from './Storage';
export * from './User';
