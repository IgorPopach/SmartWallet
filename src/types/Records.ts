export interface Cost {
    value: number;
    category: string;
    date: number;
    tag?: string;
    notes?: string;
}

export type Income = Cost;

export interface BaseRecord {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export type CostRecord = Cost & BaseRecord;
export type IncomeRecord = Income & BaseRecord;
