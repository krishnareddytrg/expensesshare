import { Component, OnInit } from '@angular/core';
import { UserService } from '../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  expenses = [];
  constructor(
    private userServ: UserService,
    private toastServ: ToastrService,
  ) { }

  ngOnInit() {
    this.loadExpenses();
  }

  deleteExpense(exp: any) {
    if (confirm(`Are you sure to delete this expense ${exp.amount}`)) {
      this.userServ.deleteExpense(exp._id).subscribe(res => {
        if (res) {
          this.toastServ.success('Expense Deleted Successfully');
          this.loadExpenses();
        }
      });
    }
  }
loadExpenses() {
  this.userServ.getAllExpenses().subscribe(res => {
    if (res) {
      this.expenses = res;
    }
  });
}
}
