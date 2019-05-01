import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../class/User';
import { HttpClient } from '@angular/common/http';
import { Follower } from '../../class/Follower';

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
    this.httpClient.get(this.followersJSON).subscribe((data:Follower[]) => {
     this.all_followers=data;
     console.log('READING ALL FOLLOWERS.JSON',this.all_followers);
    });
  }
  replaceAllFollowersFile(all_followers){
    console.log('REPLACING JSON');
    this.httpClient.put(this.followersJSON,all_followers).subscribe((data:Follower[]) => {
      this.all_followers=data;
      console.log('READING ALL FOLLOWERS.JSON',this.all_followers);
     });
  }
  
  getAllUsers(){
    return this.users;
  }
  getAllFollowers():Follower[]{
    return this.all_followers;
  }
  async leerDatosDelJSON() {
    const response = await fetch(this.urlJSON);
    if (response.status != 200) { return []; }
    const arreglo = await response.json();
    this.users = arreglo.slice();
    this.usersChange.next(this.users.slice());
    this.lastId = this.users.length + 1;
    this.leerFollowers();
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
  createUser(user: User) {
    console.log('Usuario a crear', user);
    this.users.push(user);
    console.log('USUARIOS', this.users);
    // 1. Crear XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('PUT', this.urlJSON);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    // 4. Enviar solicitud a la red
    xhr.send(JSON.stringify(this.users));
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
      if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
        // Ocurrió un error
        alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
      } else {
        console.log(xhr.responseText); // Significa que fue existoso
      }
    };
    this.usersChange.next(this.users.slice());
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
