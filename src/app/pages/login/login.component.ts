import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ROLES} from '../../helpers/constants';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.buildForm();

    /* CREATE DUMMY USERS USING THIS FUNCTIONS  */

    // For Admin Users
    // this.createAdminUser('admin', 'admin');

    // For Clients
    // this.createClientUser('scott', '123456');
  }

  buildForm(): void {
    this.loginFormGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  doLogin(values): void {
    this.userService.login()
      .subscribe(res => {

        const userRes = res.find((user) => user.userName === values.userName && user.password === values.password);

        if (userRes) {
          this.userService.setLoggedInUser(userRes);
          this.router.navigate(['/', 'admin', 'products']);
        } else {
          this.snackBar.open('Username or password not valid', 'OKAY', {duration: 4000});
        }
      });
  }


  private createAdminUser(userName, password) {
    const user = {
      userName,
      password,
      role: ROLES.ADMIN,
    };
    this.userService.createUser(user)
      .subscribe((key) => {
        console.log('key: ', key);
      });
  }

  private createClientUser(userName, password) {
    const user = {
      userName,
      password,
      role: ROLES.USER,
    };
    this.userService.createUser(user)
      .subscribe((key) => {
        console.log('key: ', key);
      });
  }
}
