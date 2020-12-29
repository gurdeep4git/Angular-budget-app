import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { filter, toArray } from 'rxjs/operators';
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
        this.incomeTransactions = x.filter(t => t.type === 1);
        this.expenseTransactions = x.filter(t => t.type === -1);
      });

    // this.subscription = this.tService.getTransactions().subscribe(x => {
    //   this.incomeTransactions = x.filter(t => t.type === 1);
    //   this.expenseTransactions = x.filter(t => t.type === -1);
    // });  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
