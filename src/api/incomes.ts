import { Income, IncomeRecord } from '../types';
import createRecordsAPIForCollection from '../firebase/records';

const api = createRecordsAPIForCollection('income');

export const createIncome = (userId: string, cost: Income) => api.create(userId, cost);

export const readIncome = (userId: string, limit?: number) => api.read<IncomeRecord>(userId, limit);

export const updateIncome = (userId: string, cost: IncomeRecord) => api.update(userId, cost);

export const deleteIncome = (userId: string, cost: IncomeRecord) => api.delete(userId, cost);
