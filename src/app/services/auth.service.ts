import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../class/User';
import { UsuarioService } from './usuarios/usuario.service';
import { Follower } from '../class/Follower';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';
  user: User;
  loginStatusChange = new Subject<User>();
  logoutChange = new Subject<Boolean>();
  my_followers: User[];
  constructor(private usuarioService: UsuarioService, private httpClient: HttpClient,
    private route: ActivatedRoute, private router: Router) { }
  isAuthehticated(): boolean {
    console.log('AUTH', this.token.length > 0);
    return this.token.length > 0;
  }
  get_my_followers() {
    // console.log('AUTHUSER',this.authService.user);
    if (this.usuarioService.getAllFollowers()) {
      const follower_object: Follower = this.usuarioService.getAllFollowers().find((item) => {
        if (item.user_id == this.user.id) {
          return true;
        }
      });
      if (follower_object) {
        const users: User[] = this.usuarioService.getAllUsers().filter((item) => {
          return follower_object.followers.includes(item.id);
      });
      console.log('FOLLOWERS USUARIO', users);
      this.my_followers = users;
      } else {
        this.my_followers = [];
      }
    } else {
      this.my_followers = [];
    }


  }
  searchFollowers(search: string): User[] {
    const patt = new RegExp(search);
    const users_found = this.my_followers.filter(item => {
      if (patt.test(item.username)) {
        return true;
      }
    });
    return users_found;
  }
  createUser(user: User) {
    this.httpClient.post(environment.apiUrl + 'api/v1/signUp', user).subscribe((data) => {
      this.usuarioService.pushUser(data['user']);
      this.usuarioService.usersChange.next(this.usuarioService.getUsers());
      this.login(data['user'], data['token']);
      this.router.navigate(['/profile', data['user']['username']]);
     }, error => {
      console.log('Error', error);
   });
  }


  update_follower(follower: Follower) {
    const headers = new  HttpHeaders().set('x-auth', this.token);
    this.httpClient.put(environment.apiUrl + 'api/v1/user/follow', follower, {headers}).subscribe((data: Follower[]) => {
      console.log('PUT FOLLOWER', data);
      this.usuarioService.updateAllFollowers(data);
     },
     error  => {
       if (error.status == 401) {
          /// TOKEN ERROR
          this.token = '';
          this.user = null;
          this.logoutChange.next(false);
          this.router.navigate(['/login']);
       }
     }
     );
  }

  login(user: User, tokenDb) {
    this.token = tokenDb;
    this.user = user;
    console.log('USER LOGED', this.user);
    this.loginStatusChange.next(user);
    /*GET FOLLOWERS OF CURRENT USER*/
    this.get_my_followers();
  }
  logout() {
    this.token = '';
    this.user = null;
  }
}
