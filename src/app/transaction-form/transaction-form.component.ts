import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../models';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {

  constructor(private tService: TransactionService, private fb: FormBuilder,) { }

  transactionForm: FormGroup;
  submitted: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.transactionForm = this.fb.group({
      type: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  get transactionFormControl() {
    return this.transactionForm.controls;
  }

  transactionSubmit(): void {
    this.submitted = true;

    console.log(this.transactionForm);
    if (this.transactionForm.invalid) {
      return;
    }


    const transaction = new Transaction();
    transaction.id = Number(Math.floor(Math.random() * 100));
    transaction.type = Number(this.transactionForm.value.type);
    transaction.description = this.transactionForm.value.description;
    transaction.amount = Number(this.transactionForm.value.amount);

    this.tService.addTransaction(transaction);

    this.reset();
  }


  private reset() {
    this.submitted = false;
    this.transactionForm.reset();
  }
}
