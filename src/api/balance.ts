import createRecordsAPIForCollection, { getUserCollection } from '../firebase/records';
import { Period, BalanceRecord } from '../types';
import { readCostsForPeriod } from './costs';
import { readIncomeForPeriod } from './incomes';
import { getPeriodName } from '../services/time';
import { withID } from '../utils/firebase';

const COLLECTION_NAME = 'balances';
const api = createRecordsAPIForCollection(COLLECTION_NAME);

function calculateUserBalance(userId: string, period: Period) {
    return Promise.all([readCostsForPeriod(userId, period), readIncomeForPeriod(userId, period)]).then(
        getBalanceCalculationForPeriod(getPeriodName(period.from)),
    );
}

function getBalanceCalculationForPeriod(periodName: string) {
    return <T extends { value: number }>([costs, income]: [T[], T[]]) => ({
        costs: costs.reduce((sum, { value }) => sum + value, 0),
        income: income.reduce((sum, { value }) => sum + value, 0),
        periodName,
    });
}

export const createBalance = (userId: string, period: Period) =>
    calculateUserBalance(userId, period).then((balance) => api.createDocument(userId, balance.periodName, balance));

export const readBalance = (userId: string) =>
    getUserCollection(userId, COLLECTION_NAME)
        .get()
        .then((snapshot) => {
            const result: BalanceRecord[] = [];
            snapshot.forEach((doc) => result.push(withID(doc)));
            return result;
        });

export const updateBalance = (userId: string, period: Period) =>
    calculateUserBalance(userId, period).then(({ periodName, ...updates }) =>
        api.readById(userId, periodName).then((document) => api.update(userId, { ...document, ...updates })),
    );
