import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/class/User';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //https://api.myjson.com/bins/wse9o
  users:User[];
  usersChange = new Subject<User[]>();
  constructor() { }
  private urlJSON="https://api.myjson.com/bins/wse9o";
  async leerDatosDelJSON() {
    let response = await fetch(this.urlJSON);
    if(response.status != 200 ) return [];
    let arreglo =  await response.json();
    this.users=arreglo.slice();
    this.usersChange.next(this.users.slice());
  }
  
}
