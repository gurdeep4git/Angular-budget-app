import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransactionSummary } from '../models';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.scss']
})
export class TransactionSummaryComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  transactionSummary: TransactionSummary;

  constructor(private tService: TransactionService) { }

  ngOnInit(): void {
    // this.subscription.push(this.tService.getTransactions().subscribe(transactions => {
    //   this.tService.updateTransactionSummary(transactions);
    // }));

    this.subscription = this.tService.transactionsSummary$.subscribe(summary => {
      this.transactionSummary = summary;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
