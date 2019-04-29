import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/class/User';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // https://api.myjson.com/bins/wse9o
  private users: User[];
  usersChange = new Subject<User[]>();
  private lastId = 1;
  constructor() { }
  private urlJSON = 'https://api.myjson.com/bins/wse9o';
  // leerDatosDelJSON();
  async leerDatosDelJSON() {
    const response = await fetch(this.urlJSON);
    // tslint:disable-next-line: triple-equals
    if (response.status != 200) { return []; }
    const arreglo = await response.json();
    this.users = arreglo.slice();
    this.usersChange.next(this.users.slice());
    this.lastId = this.users.length + 1;
  }
  getNextId(): number {
    return this.lastId;
  }
  getUsers(): User[] {
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
      // tslint:disable-next-line: triple-equals
      if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
        // Ocurrió un error
        alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
      } else {
        console.log(xhr.responseText); // Significa que fue existoso
      }
    };
    this.usersChange.next(this.users.slice());
  }
  findUserbyUsername(username: string) {
    /*if(this.users==undefined){
      await this.leerDatosDelJSON();
    }*/
    const index = this.users.findIndex(item => {
      // tslint:disable-next-line: triple-equals
      if (item.username == username) {
        return true;
      }
    });
    if (index >= 0) {
      return this.users[index];
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
