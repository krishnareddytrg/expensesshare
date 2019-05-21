import { Component, OnInit } from '@angular/core';
import { UserService } from '../services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users = [];
  constructor(
    private userServ: UserService,
    private toastServ: ToastrService,
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  deleteUser(user: any) {
    if (confirm(`Are you sure to delete  ${user.name}`)) {
      this.userServ.deleteUser(user._id).subscribe(res => {
        if (res) {
          this.toastServ.success('User Delete Successfully');
          this.loadUsers();
        }
      });
    }
  }
  loadUsers() {
    this.userServ.getAll().subscribe(res => {
      if (res) {
        this.users = res;
      }
    });
  }

}
