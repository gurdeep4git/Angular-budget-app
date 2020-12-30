import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { TransactionType } from './enums';
import { Transaction, TransactionSummary } from './models';

@Injectable()
export class TransactionService {

    private transactionSummary: TransactionSummary;

    transactionsSummary$ = new BehaviorSubject<TransactionSummary>(new TransactionSummary());

    private transactionsSource$ = new BehaviorSubject<Transaction[]>(
        // [
        //     { id: 1, type: 1, description: "Test", amount: 1000 }
        // ]
        []
    );

    transactions$ = this.transactionsSource$.asObservable();

    constructor() {
        this.transactionSummary = new TransactionSummary();
    }

    public getTransactions(): Observable<Transaction[]> {
        return this.transactions$;
    }

    public addTransaction(transaction: Transaction): void {
        this.transactions$.pipe(
            take(1),
            map(transactions => {
                transactions.push(transaction);
                return transactions;
            }),
            tap(transactions => this.updateTransactionSummary(transactions))
        ).subscribe(transactions => {
            this.transactionsSource$.next(transactions);
        });
    }

    public deleteTransaction(id: number): void {
        this.transactions$.pipe(
            take(1),
        ).subscribe(transactions => {
            const filtered = transactions.filter(t => t.id !== id);
            this.updateTransactionSummary(filtered)
            this.transactionsSource$.next(filtered);
        });
    }

    public updateTransactionSummary(transactions: Transaction[]): void {
        const { totalIncome, totalExpense, balance } = this.calculateBalance(transactions);
        this.transactionSummary.totalIncome = totalIncome;
        this.transactionSummary.totalExpense = totalExpense;
        this.transactionSummary.balance = balance;
        this.transactionsSummary$.next(this.transactionSummary);
    }

    private calculateBalance(transactions: Transaction[]): TransactionSummary {
        const totalIncome = this.getTotal(transactions.filter(t => t.type === TransactionType.Income));
        const totalExpense = this.getTotal(transactions.filter(t => t.type === TransactionType.Expense));
        const balance = totalIncome - totalExpense;
        return {
            totalIncome,
            totalExpense,
            balance
        }
    }

    private getTotal(transactions: Transaction[]) {
        let sum = 0;
        transactions.forEach(t => {
            sum += t.amount;
        })
        return sum;
    }
}   
