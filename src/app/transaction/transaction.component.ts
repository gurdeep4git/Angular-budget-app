import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TransactionType } from '../enums';
import { Transaction } from '../models';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, OnDestroy {

  constructor(private tService: TransactionService) { }

  subscription: Subscription;
  transactions$: Observable<Transaction[]>;
  incomeTransactions: Transaction[] = [];
  expenseTransactions: Transaction[] = [];

  ngOnInit(): void {
    this.transactions$ = this.tService.getTransactions();

    this.subscription = this.transactions$
      .subscribe(x => {
        this.incomeTransactions = x.filter(t => t.type === TransactionType.Income);
        this.expenseTransactions = x.filter(t => t.type === TransactionType.Expense);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
