import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { User } from 'src/app/class/User';
import { Subscription, Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { checkUsername } from 'src/app/validators/check-username';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private urlJSON = 'https://api.myjson.com/bins/wse9o';
  user: User;
  private users: User[];
  usersChange = new Subject<User[]>();
  profile: User;
  aparam: string;
  userChangeSub: Subscription;
  formUsername: FormGroup;
  formPassword: FormGroup;

  constructor(private usuarioService: UsuarioService, private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.user = this.auth.user;
    console.log(this.user); // YA SIRVE
    this.users = this.usuarioService.getUsers();
    console.log(this.users);
    this.formUsername = new FormGroup({
      newusername: new FormControl('', [Validators.required, checkUsername])
    });
    this.formPassword = new FormGroup({
      newpassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  updateUsername() {
    console.log('Usuario a modificar', this.user);
    const index = this.users.findIndex(item => {
      if (this.auth.isAuthehticated) {
        if (this.auth.user.username === item.username) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    console.log('Paso 1');
    if (index >= 0) {
      this.users[index]['username'] = this.formUsername.value.newusername;
    }
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
    this.router.navigateByUrl('/profile/' + this.users[index].username + '/settings');
    console.log('Username updated');
  }

  updatePassword() {
    console.log('Usuario a modificar', this.user);
    const index = this.users.findIndex(item => {
      if (this.auth.isAuthehticated) {
        if (this.auth.user.username === item.username) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    console.log('Paso 1');
    if (index >= 0) {
      this.users[index]['password'] = this.formPassword.value.newpassword;
    }
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
    console.log('Password updated');
  }

}
