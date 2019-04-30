import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../class/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';
  user: User;
  loginStatusChange = new Subject<User>();
  constructor() { }
  isAuthehticated(): boolean {
    console.log('AUTH',this.token.length > 0);
    return this.token.length > 0;
  }
  login(user: User) {
    this.token = 'esta logeado';
    this.user = user;
    this.loginStatusChange.next(user);
  }
  logout() {
    this.token = '';
    this.user = null;
  }
}
