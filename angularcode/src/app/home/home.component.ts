import { Component, OnInit } from '@angular/core';
import { UserService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  expenses = [];
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getShareByUser().subscribe(res =>{
      if (res) {
         this.expenses = res;
      }
    });
  }

}
