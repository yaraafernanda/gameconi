import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../class/User';
import { UsuarioService } from './usuarios/usuario.service';
import { Follower } from '../class/Follower';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';
  user: User;
  loginStatusChange = new Subject<User>();
  my_followers:User[];
  constructor(private usuarioService:UsuarioService) { }
  isAuthehticated(): boolean {
    console.log('AUTH',this.token.length > 0);
    return this.token.length > 0;
  }
  get_my_followers(){
    //console.log('AUTHUSER',this.authService.user);
    let follower_object:Follower=this.usuarioService.getAllFollowers().find((item)=>{
      if(item.user_id==this.user.id){
        return true;
      }
    });
    let users:User[]=this.usuarioService.getAllUsers().filter((item)=>{
        return follower_object.followers.includes(item.id);
    });
    console.log('FOLLOWERS USUARIO',users);
    this.my_followers=users;
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

  login(user: User) {
    this.token = 'esta logeado';
    this.user = user;
    this.loginStatusChange.next(user);
    /*GET FOLLOWERS OF CURRENT USER*/
    this.get_my_followers();
  }
  logout() {
    this.token = '';
    this.user = null;
  }
}
