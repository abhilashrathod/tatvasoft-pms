import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {Observable} from 'rxjs';

import * as uuid from 'uuid';

import {MENU_ITEMS} from '../helpers/constants';

export const USER_STORE = 'users';

export interface IUser {
  id?: string;
  userName: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dbService: NgxIndexedDBService) {
  }

  setLoggedInUser(user): void {
    const encodedUser = btoa(JSON.stringify(user));
    localStorage.setItem('_user', encodedUser);
  }

  getLoggedInUser(): any {
    const encodedUser = localStorage.getItem('_user');
    if (encodedUser) {
      return JSON.parse(atob(encodedUser));
    }

    return '';
  }

  logoutUser(): void {
    localStorage.removeItem('_user');
  }

  createUser(payload: IUser): Observable<any> {
    return this.dbService
      .add(USER_STORE, {
        id: uuid.v4(),
        userName: payload.userName,
        password: payload.password,
        role: payload.role,
      });
  }

  login(): Observable<any> {
    return this.dbService.getAll(USER_STORE);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.userService.getLoggedInUser();

    if (user) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }

  }
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.userService.getLoggedInUser();

    const currentRoute = MENU_ITEMS.find(item => item.route.includes(route.routeConfig.path));

    if (currentRoute.roles.includes(user.role)) {
      return true;
    } else {
      this.router.navigate(['/', 'admin', 'products']);
    }
  }
}
