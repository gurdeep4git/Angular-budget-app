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

  subscriptionOnInit: Subscription;
  subscriptionOnAfterViewInit: Subscription;
  transactionSummary: TransactionSummary;
  currentDate = new Date();

  constructor(private tService: TransactionService) { }

  ngOnInit(): void {
    this.subscriptionOnInit = this.tService.transactionsSummary$.subscribe(summary => {
      this.transactionSummary = summary;
    });
  }

  ngOnDestroy() {
    this.subscriptionOnInit.unsubscribe();
    this.subscriptionOnAfterViewInit.unsubscribe();
  }
}
