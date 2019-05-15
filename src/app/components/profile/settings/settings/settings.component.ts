import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { User } from '../../../../class/User';
import { UsuarioService } from '../../../../services/usuarios/usuario.service';
import { AuthService } from '../../../../services/auth.service';
import { checkUsername } from '../../../../validators/check-username';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  // private urlJSON = 'https://api.myjson.com/bins/wse9o';
  user: User;
  private users: User[];
  usersChange = new Subject<User[]>();
  profile: User;
  aparam: string;
  userChangeSub: Subscription;
  formUsername: FormGroup;
  formPassword: FormGroup;
  errMsg = '';
  infMsg = '';
  updateMsg = '';

  constructor(private usuarioService: UsuarioService,
    private auth: AuthService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.user = this.auth.user;
    console.log('Mi usuario: ', this.user); // YA SIRVE
    this.users = this.usuarioService.getUsers();
    console.log('Todos los usuarios: ', this.users);
    this.formUsername = new FormGroup({
      newusername: new FormControl('', [Validators.required, checkUsername])
    });
    this.formPassword = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmedpassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  updateUsername() {
    console.log('Usuario a modificar: ', this.user);
    this.errMsg = '';
    let index = this.users.findIndex(item => {
      if (this.formUsername.value.newusername === item.username) {
        return true;
      }
    });
    if (index >= 0) {
      this.errMsg = 'That username is already taken';
      return;
    } else {
      index = this.users.findIndex(item => {
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
    }
    if (index >= 0) {
      console.log('Cambiando username...'); // aqui ya puse el nuevo username
      this.users[index]['username'] = this.formUsername.value.newusername;
      console.log('USUARIOS', this.users); // debe aparecer modificado
      // Update BD
      const headers = new HttpHeaders().set('x-auth', this.auth.token);
      console.log('My token', this.auth.token);
      this.httpClient.put(environment.apiUrl + 'api/v1/user/updateUsername', this.users[index], { headers }).subscribe(
        (data: User[]) => {
          console.log('PUT USER', data);
          this.users = data;
          console.log('All users... ', this.users);
        },
        error => {
          if (error.status === 401) {
            console.log('No estás autorizado', error);
          }
        }
      );
      // fin
      this.user = this.users[index];
      this.auth.loginStatusChange.next(this.user);
      this.router.navigateByUrl('/profile/' + this.users[index].username + '/settings');
      this.updateMsg = 'Username updated';
      console.log('Username updated');
      this.formUsername.setValue({ newusername: '' });
    }
  }

  updatePassword() {
    console.log('Usuario a modificar', this.user);
    this.infMsg = '';
    this.updateMsg = '';
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
    if (index >= 0) {
      // if (this.formPassword.value.password === this.users[index]['password']) {
      if (this.formPassword.value.newpassword === this.formPassword.value.confirmedpassword) {
        if (this.formPassword.valid) {
          console.log('Cambiando contraseña...');
          this.users[index]['password'] = this.formPassword.value.newpassword;
          console.log('USUARIOS', this.users);
          // Update BD
          const headers = new HttpHeaders({
            'x-auth': this.auth.token,
            'x-pass': this.formPassword.value.password
          });
          console.log('My token', this.auth.token);
          this.httpClient.put(environment.apiUrl + 'api/v1/user/updatePassword', this.users[index], { headers }).subscribe(
            (data: User[]) => {
              console.log('PUT PASWORD', data);
              this.users = data;
              console.log('All users... ', this.users);
            },
            error => {
              if (error.status === 401) {
                console.log('No estás autorizado', error);
              }
            }
          );
          // fin
          this.usersChange.next(this.users.slice());
          console.log('Password updated');
          this.updateMsg = 'Password updated';
          this.formPassword.setValue({
            password: '',
            newpassword: '',
            confirmedpassword: ''
          });
        } else {
          this.infMsg = 'Password must be at least 6 characters';
        }
      } else {
        this.infMsg = 'Confirmation does not match';
      }
      // } else {
      //  this.infMsg = 'Current password is not correct';
      // }
    }
  }

}
