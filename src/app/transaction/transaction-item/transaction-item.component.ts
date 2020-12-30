import { Component, Input, OnInit } from '@angular/core';
import { TransactionType } from '../../enums';
import { Transaction } from '../../models';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss']
})
export class TransactionItemComponent implements OnInit {

  @Input() transaction: Transaction;
  transactionType = TransactionType;
  constructor(private tService: TransactionService) { }

  ngOnInit(): void {
  }

  onDelete(id: number) {
    this.tService.deleteTransaction(id);
  }

}
