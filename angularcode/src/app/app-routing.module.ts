import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { UsersComponent} from './users/users.component';
import { ExpensesComponent} from './expenses/expenses.component';
import { AddUserComponent} from './add-user/add-user.component';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/add', component: AddUserComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'expenses/add', component: AddExpensesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
