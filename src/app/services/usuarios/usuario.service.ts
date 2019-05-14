import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../class/User';
import { HttpClient } from '@angular/common/http';
import { Follower } from '../../class/Follower';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // https://api.myjson.com/bins/wse9o
  constructor(private httpClient:HttpClient) { 

  }
  private users: User[];
  private all_followers:Follower[];
  usersChange = new Subject<User[]>();
  private lastId = 1;
  private urlJSON = 'https://api.myjson.com/bins/wse9o';
  private followersJSON = 'https://api.myjson.com/bins/b3u6w';
  // leerDatosDelJSON();
  leerFollowers(){
    console.log('LEYENDO FOLLOWERS...');
    this.httpClient.get(environment.apiUrl+'api/v1/followers/getAll').subscribe((data:Follower[]) => {
      if(data){
        this.all_followers=data;
        console.log('READING ALL FOLLOWERS',this.all_followers);
      }
      },error => {
        console.log('Error',error);
      });

    /*this.httpClient.get(this.followersJSON).subscribe((data:Follower[]) => {
     this.all_followers=data;
     console.log('READING ALL FOLLOWERS.JSON',this.all_followers);
    });*/

  }

  update_follower(follower:Follower){
    this.httpClient.put(environment.apiUrl+'api/v1/user/follow',follower).subscribe((data:Follower[]) => {
      console.log('PUT FOLLOWER',data);
      this.all_followers=data;
      console.log('READING ALL FOLLOWERS.JSON',this.all_followers);
     });
  }

  replaceAllFollowersFile(all_followers){
    this.httpClient.put(this.followersJSON,all_followers).subscribe((data:Follower[]) => {
      this.all_followers=data;
      console.log('READING ALL FOLLOWERS.JSON',this.all_followers);
     });
  }
  
  getAllUsers(){
    return this.users;
  }
  getAllFollowers():Follower[]{
    console.log('FOLLOWERS',this.all_followers);
    return this.all_followers;
  }
  async leerDatosDelJSON() {
    this.httpClient.get(environment.apiUrl+'api/v1/users/getAll').subscribe((data:User[]) => {
        if(data){
          this.users=data;
          this.usersChange.next(this.users.slice());
          this.lastId = this.users.length + 1;
          this.leerFollowers();
          //console.log('===All users loaded',data);
          //console.log('===USERS',this.users);
        }
     },error => {
       console.log('Error',error);
    });
    /*const response = await fetch(this.urlJSON);
    if (response.status != 200) { return []; }
    const arreglo = await response.json();
    this.users = arreglo.slice();*/
    
  }
  getNextId(): number {
    return this.lastId;
  }
  getUsers():User[]{
    if(this.users){
      return this.users.slice();
    }
    return this.users;
  }
  pushUser(user:User){
    this.users.push(user);
  }
  createUser(user: User) {
    /*console.log('Usuario a crear', user);
    this.users.push(user);
    console.log('USUARIOS', this.users);
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', this.urlJSON);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(this.users));
    xhr.onload = function () {
      if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
        alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
      } else {
        console.log(xhr.responseText); // Significa que fue existoso
      }
    };*/
    /*this.httpClient.post(environment.apiUrl+'/api/v1/signUp',user).subscribe((data) => {
      this.users.push(data['user']);
      this.usersChange.next(this.users.slice());
      this.authService.login(new_user);
     },error => {
      console.log('Error',error);
   });*/
    
  }


  findUserbyUsername(username:string){
    /*if(this.users==undefined){
      await this.leerDatosDelJSON();
    }*/
    let index=this.users.findIndex(item=>{
      if(item.username==username){
        return true;
      };
    });
    if(index>=0){
      return Object.assign({}, this.users[index]);
      //return this.users[index];
    }
    return null;
  }
  searchUsers(search: string): User[] {
    const patt = new RegExp(search);
    const users_found = this.users.filter(item => {
      if (patt.test(item.username)) {
        return true;
      }
    });
    return users_found;
  }

}
