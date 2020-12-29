import { TransactionType } from "../enums";

export class Transaction {
    id: number;
    type: TransactionType;
    description: string;
    amount: number;
}

export class TransactionSummary {
    totalIncome: number = 0;
    totalExpense: number = 0;
    balance: number = 0;
}