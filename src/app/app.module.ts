import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TransactionSummaryComponent } from './transaction-summary/transaction-summary.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionService } from "./transaction.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionItemComponent } from './transaction/transaction-item/transaction-item.component';
@NgModule({
  declarations: [
    AppComponent,
    TransactionSummaryComponent,
    TransactionFormComponent,
    TransactionComponent,
    TransactionItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
