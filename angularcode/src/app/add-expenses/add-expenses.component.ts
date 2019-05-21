import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService} from '../services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss']
})
export class AddExpensesComponent implements OnInit {
  expensesForm: FormGroup;
  loading = false;
  submitted = false;
  users = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastrServ: ToastrService,
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(res => {
      if (res.length > 0) {
        this.users = res;
      }
    });
    this.expensesForm = this.formBuilder.group({
      userId: ['', Validators.required],
      amount: ['', Validators.required],
      expDate: ['', Validators.required],
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.expensesForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.expensesForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.addAmount(this.expensesForm.value)
          .subscribe(
              data => {
                  this.toastrServ.success('Amount added');
                  this.router.navigate(['/home']);
              },
              error => {
                  this.toastrServ.error(error);
                  this.loading = false;
              });
  }

}
