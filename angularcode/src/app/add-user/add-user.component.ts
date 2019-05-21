import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {  UserService } from '../services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
    });
}

// convenience getter for easy access to form fields
get f() { return this.userForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }

    this.loading = true;
    this.userService.add(this.userForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.toastr.success('User added successful');
                this.router.navigate(['/users']);
            },
            error => {
                this.toastr.error(error);
                this.loading = false;
            });
}

}
