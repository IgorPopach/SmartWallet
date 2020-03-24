import createRecordsAPIForCollection from '../firebase/records';
import { Cost, CostRecord, Period } from '../types';

const api = createRecordsAPIForCollection('costs');

export const createCosts = (userId: string, cost: Cost) => api.create(userId, cost);

export const readCosts = (userId: string, limit?: number) => api.read<CostRecord>(userId, limit);

export const readCostsForPeriod = (userId: string, period: Period) => api.readForPeriod<CostRecord>(userId, period);

export const updateCosts = (userId: string, cost: CostRecord) => api.update(userId, cost);

export const deleteCosts = (userId: string, cost: CostRecord) => api.delete(userId, cost);
