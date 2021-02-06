import {Component, OnInit} from '@angular/core';
import {IUser, UserService} from '../../../services/user.service';
import {MENU_ITEMS} from '../../../helpers/constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit {

  menuItems = [];
  user: IUser;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
    this.menuItems = MENU_ITEMS.filter(item => item.roles.includes(this.user.role));
  }

  doLogout(): void {
    this.userService.logoutUser();
    this.router.navigate(['/']);
  }
}
